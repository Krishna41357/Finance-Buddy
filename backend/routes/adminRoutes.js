// routes/adminRoutes.js
import express from 'express';
import {
  upload,
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from '../Controllers/adminBlogController.js';
import verifyAdminToken from '../Middlewares/verifyAdminToken.js';

const router = express.Router();

// Article (blog/news) management routes
router.post('/articles', verifyAdminToken, upload.single('featuredImage'), createArticle);
router.get('/articles', verifyAdminToken, getAllArticles);
router.get('/articles/:id', verifyAdminToken, getArticleById);
router.put('/articles/:id', verifyAdminToken, upload.single('featuredImage'), updateArticle);
router.delete('/articles/:id', verifyAdminToken, deleteArticle);

export default router;

