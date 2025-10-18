// jobs/fetchArticles.js
import axios from 'axios';
import Article from '../models/Article.js';


const extractSummary = (content) => {
  if (!content) return '';
  const sentences = content.split('.').map(s => s.trim()).filter(Boolean);
  return sentences.length >= 2
    ? sentences.slice(0, 3).join('. ') + '.'
    : content.slice(0, 200) + '...';
};

const fetchFromEODHD = async (keyword) => {
  try {
    const url = `https://eodhd.com/api/news?api_token=${process.env.EODHD_API_KEY}&t=${keyword}&limit=50`;
    const { data } = await axios.get(url);
    return data.slice(0, 50);
  } catch (err) {
    console.error(`EODHD API error for "${keyword}":`, err.message);
    return [];
  }
};

export const fetchAndStoreArticles = async (keywords = []) => {
  const allArticles = [];

  for (const keyword of keywords) {
    const news = await fetchFromEODHD(keyword);
    const transformed = news.map(item => ({
      type: 'news',
      title: item.title || '',
      url: item.url || `https://www.google.com/search?q=${encodeURIComponent(item.title)}`,
      content: item.content || '',
      summary: extractSummary(item.content),
      label: [keyword],
      source: item.source || 'EODHD',
      featuredImage: item.image || null,
      scrapedAt: new Date(item.date) || new Date()
    }));
    allArticles.push(...transformed);
  }

  const finalArticles = allArticles.slice(0, 50); // max 50 per fetch

  try {
    await Article.insertMany(finalArticles, { ordered: false });
    console.log(`✅ Inserted ${finalArticles.length} articles`);
  } catch (err) {
    console.error('❌ MongoDB insert error:', err.message);
  }
};
