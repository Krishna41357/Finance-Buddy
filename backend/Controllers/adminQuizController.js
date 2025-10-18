import Quiz from '../models/quiz.model.js';

// @desc Add a new quiz
export const addQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete a quiz by MongoDB _id
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB _id
    const deleted = await Quiz.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Edit (update) a quiz by MongoDB _id
export const editQuiz = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB _id
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all quizzes (for admin panel)
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
