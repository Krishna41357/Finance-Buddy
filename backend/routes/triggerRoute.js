// routes/triggerRoute.js
import express from 'express';
import { fetchAndStoreArticles } from '../Jobs/fetchArticles.js';

const router = express.Router();
const defaultKeywords = ['crypto', 'banking', 'ai', 'stock', 'finance'];

router.post('/trigger-news-fetch', async (req, res) => {
  try {
    const { keywords } = req.body;
    const keywordList = Array.isArray(keywords) && keywords.length > 0
      ? keywords
      : defaultKeywords;

    await fetchAndStoreArticles(keywordList);
    res.status(200).json({ message: 'News fetch triggered successfully' });
  } catch (err) {
    console.error('Manual trigger error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
