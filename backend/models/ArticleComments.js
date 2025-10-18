import mongoose from 'mongoose';

// Sub-schema for a reply
const replySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

// Sub-schema for a comment with replies
const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: {
    type: [replySchema],
    default: []
  }
}, { _id: false });

// Main schema
const articleCommentsSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
    unique: true,
  },
  commentsMap: {
    type: Map,
    of: [commentSchema],
    default: {},
  }
}, { timestamps: true });

export default mongoose.model('ArticleComments', articleCommentsSchema);
