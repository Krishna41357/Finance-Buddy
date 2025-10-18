import express from 'express';
import {
  addQuiz,
  deleteQuiz,
  editQuiz,
  getAllQuizzes
} from '../Controllers/adminQuizController.js';

const router = express.Router();

// GET all quizzes
router.get('/', getAllQuizzes); 

// Add, delete, edit
router.post('/', addQuiz);
router.delete('/:id', deleteQuiz);
router.put('/:id', editQuiz);

export default router;
