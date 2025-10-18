import express from "express";
import {
  markQuizAsTaken,
  getUserQuizStats,
  getAllquiz
} from "../Controllers/userQuizController.js";

const router = express.Router();

//get quiz data
router.get("/quizData", getAllquiz );

// ✅ Mark quiz as taken
router.post("/:userId/taken", markQuizAsTaken);

// ✅ Get quizzes taken count and list
router.get("/:userId/stats", getUserQuizStats);

export default router;
