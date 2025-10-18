import User from "../models/User.js";
import Quiz from "../models/quiz.model.js";

export const getAllquiz = async(req , res) =>{
  try{
    const quiz = await Quiz.find().sort({createdAt:-1});
    res.status(200).json(quiz);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Add a quiz to user's quizzesTaken (ObjectId of quiz)
export const markQuizAsTaken = async (req, res) => {
  try {
    const { userId } = req.params;
    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required." });
    }

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found." });

    // Add quizId only if it's not already present
    if (!user.quizzesTaken.includes(quizId)) {
      user.quizzesTaken.push(quizId);
      await user.save();
    }

    res.status(200).json({
      message: "✅ Quiz marked as taken.",
      quizzesTakenCount: user.quizzesTaken.length,
      quizzesTaken: user.quizzesTaken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get list and count of quizzes taken by the user
export const getUserQuizStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('quizzesTaken', 'title category difficulty');

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      quizzesTakenCount: user.quizzesTaken.length,
      quizzesTaken: user.quizzesTaken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
