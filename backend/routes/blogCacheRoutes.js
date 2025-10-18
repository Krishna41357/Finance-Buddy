import express from 'express';
import { getRecentBlogs } from '../Controllers/blogCacheController.js';


const router = express.Router();

// Public route to get recent blogs by label with Redis caching
router.get('/recentBlogs', getRecentBlogs);
export default router;
