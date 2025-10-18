import Article from '../models/Article.js';

// Add userId to views if not already present
export const incrementView = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (!article.views.includes(userId)) {
      article.views.push(userId);
      await article.save();
    }

    res.json({ success: true, views: article.views.length });
  } catch (err) {
    console.error('incrementView error:', err);
    res.status(500).json({ error: 'Failed to increment view' });
  }
};

// Add userId to likes if not already present
export const incrementLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (!article.likes.includes(userId)) {
      article.likes.push(userId);
      await article.save();
    }

    res.json({ success: true, likes: article.likes.length });
  } catch (err) {
    console.error('incrementLike error:', err);
    res.status(500).json({ error: 'Failed to increment like' });
  }
};

// Get counts
export const getCounts = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    res.json({
      id,
      views: article.views.length,
      likes: article.likes.length
    });
  } catch (err) {
    console.error('getCounts error:', err);
    res.status(500).json({ error: 'Failed to get counts' });
  }
};
