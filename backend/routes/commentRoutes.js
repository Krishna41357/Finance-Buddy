import {
  addComment,
  getCommentsByArticle,
  deleteComment,
  addReply
} from '../Controllers/commentController.js';

import express from 'express';
const router = express.Router();

router.post('/add', addComment);
router.get('/:articleId', getCommentsByArticle);
router.delete('/delete', deleteComment);
router.post('/reply', addReply); // 🔥 NEW

export default router;
