// models/Article.js
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['blog', 'news'],
    required: true
  },
  title: String,
  url: String,
  summary: String, // optionally GPT-generated
  content: String, // full scraped content
  label: {
  type: [String], // <-- array of strings
  default: []
}, // e.g., 'Banking', 'Crypto'
  source: String, // optional: site/source name
  featuredImage: {
    type: String,
    default: null // Store the file path
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

const Article = mongoose.model('Article', articleSchema);
export default Article;