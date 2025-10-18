import mongoose from 'mongoose';

// Schema for each question in the quiz
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true } // index of the correct option
}, { _id: true });

// Main Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String }, // emoji or image URL
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  questions: { type: Number, required: true }, // total question count
  timeLimit: { type: Number, required: true }, // in minutes
  category: { type: String, required: true },
  questions_data: {
    type: [questionSchema],
    required: true
  }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
