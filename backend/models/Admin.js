// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isRoot:   { type: Boolean, default: false }, // root admin flag
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Admin', adminSchema);
