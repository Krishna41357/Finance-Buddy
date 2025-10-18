import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  summaryText: String,
  personalizedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  generatedAt: {
    type: Date,
    default: Date.now
  }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
