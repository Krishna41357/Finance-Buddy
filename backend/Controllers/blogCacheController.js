import redisClient from '../utils/redisClient.js';
import Article from '../models/Article.js';
import User from '../models/User.js';

const CACHE_EXPIRATION_SECONDS = 60 * 10;
const MAX_ARTICLES = 5;

function formatKey(label, type) {
  const cleanLabel = label.trim().toLowerCase().replace(/\s+/g, '-');
  const cleanType = (type || 'all').trim().toLowerCase();
  return `feed:article:${cleanType}:${cleanLabel}`;
}

export async function getRecentBlogs(req, res) {
  try {
    const userId = req.query.userId; 
    const type = req.query.type;

    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const user = await User.findById(userId).lean();
    if (!user || !user.preferences?.length)
      return res.status(404).json({ message: 'User not found or no preferences set' });

    const preferences = user.preferences;
    let seenArticleIds = new Set(user.seenArticles?.map(String) || []);
    const redisKeys = preferences.map(pref => formatKey(pref, type));

    let allRedisArticles = [];
    for (const key of redisKeys) {
      const redisArticles = await redisClient.zRange(key, 0, -1, { REV: true });
      const parsedArticles = redisArticles.map(str => JSON.parse(str));
      const unseen = parsedArticles.filter(article => !seenArticleIds.has(String(article._id)));
      allRedisArticles.push(...unseen);
    }

    // Deduplicate and sort by scrapedAt
    const uniqueRedis = new Map();
    for (const article of allRedisArticles) {
      if (article?._id && !uniqueRedis.has(article._id)) {
        uniqueRedis.set(article._id, article);
      }
    }

    const sortedUnseenRedis = Array.from(uniqueRedis.values()).sort((a, b) =>
      new Date(b.scrapedAt || 0) - new Date(a.scrapedAt || 0)
    );

    let resultArticles = sortedUnseenRedis.slice(0, MAX_ARTICLES);
    const fetchedFromRedisIds = resultArticles.map(a => a._id);

    // If we have enough from Redis
    if (resultArticles.length === MAX_ARTICLES) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { seenArticles: { $each: fetchedFromRedisIds } }
      });
      return res.status(200).json({ source: 'cache', articles: resultArticles });
    }

    // Else, fetch from DB (only unseen)
    const labelRegexArray = preferences.map(pref => new RegExp(`^${pref.trim()}$`, 'i'));
    const typeRegex = type ? new RegExp(`^${type.trim()}$`, 'i') : undefined;

    const dbQuery = {
      label: { $in: labelRegexArray },
      ...(typeRegex ? { type: typeRegex } : {}),
      _id: { $nin: Array.from(seenArticleIds) }
    };

    const dbArticles = await Article.find(dbQuery)
      .sort({ scrapedAt: -1 })
      .limit(MAX_ARTICLES - resultArticles.length)
      .lean();

    const fetchedFromDbIds = dbArticles.map(a => a._id);
    resultArticles = [...resultArticles, ...dbArticles];

    // Update user history
    if (fetchedFromDbIds.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { seenArticles: { $each: fetchedFromDbIds } }
      });
    }

    // Cache DB articles to Redis for future reuse
    if (dbArticles.length > 0) {
      const insertPipeline = redisClient.multi();
      for (const article of dbArticles) {
        const score = new Date(article.scrapedAt || Date.now()).getTime();
        for (const label of article.label || []) {
          if (preferences.includes(label)) {
            const key = formatKey(label, type);
            insertPipeline.zAdd(key, [{ score, value: JSON.stringify(article) }]);
            insertPipeline.expire(key, CACHE_EXPIRATION_SECONDS);
          }
        }
      }
      await insertPipeline.exec().catch(err => console.error('❌ Redis pipeline error:', err));
    }

    // 🔁 Reset logic: If Redis is fully seen and DB returns 0 new
    const isRedisEmpty = sortedUnseenRedis.length === 0;
    const isDbEmpty = dbArticles.length === 0;

    if (isRedisEmpty && isDbEmpty) {
      console.log('🔁 Resetting user seenArticles, all articles exhausted');
      await User.findByIdAndUpdate(userId, { $set: { seenArticles: [] } });
    }

    const source = dbArticles.length > 0 ? 'db' : 'cache';
    return res.status(200).json({ source, articles: resultArticles });

  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    return res.status(500).json({ message: 'Failed to fetch recent blogs', error });
  }
}
