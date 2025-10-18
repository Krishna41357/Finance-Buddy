import express from 'express';
import { incrementLike, incrementView, getCounts } from '../Controllers/likeViewController.js';

const router = express.Router();

// No more `:type` in the routes
router.post('/:id/view', incrementView);
router.post('/:id/like', incrementLike);
router.get('/:id/counts', getCounts);

export default router;
