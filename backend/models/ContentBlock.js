// === 1. Content Schema ===

// models/ContentBlock.js
import { Schema, model } from 'mongoose';

const contentBlockSchema = new Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, enum: ['heading', 'paragraph', 'json'], required: true },
  content: { type: Schema.Types.Mixed, required: true }  // <--- allows string, array, object
});

export default model('ContentBlock', contentBlockSchema);

