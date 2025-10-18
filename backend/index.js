import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import cron from "node-cron";
import path from "path";

import contactRoutes from "./routes/contactRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import blogCacheRoutes from "./routes/blogCacheRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rootAdminRoutes from "./routes/rootAdminRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import likeViewRoutes from "./routes/likeViewRoutes.js";
import adminQuizRoutes from "./routes/adminQuizRoutes.js";
import userCoinsRoutes from "./routes/userCoinsRoutes.js";
import userQuizRoutes from "./routes/userQuizRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import portfolioRoute from "./routes/portfolioRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import triggerRoute from "./routes/triggerRoute.js";
import { startScheduler } from "./scheduler.js";
import redisClient from "./utils/redisClient.js";
import { setupGoogleStrategy } from "./Controllers/authController.js";

dotenv.config();

// Initialize passport
setupGoogleStrategy();

// Express setup
const app = express();

// 🔹 Environment variables (Render will inject them automatically)
const PORT = process.env.PORT || 4000;

// ✅ Flexible MongoDB Connection (Direct URI or built dynamically)
const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// MongoDB Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || true, // Optional frontend URL for Render
  credentials: true,
};

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());

// Static files (uploads)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/blogCache", blogCacheRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/article", likeViewRoutes);

// Admin routes
app.use("/api/v1/auth/admin", adminAuthRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/rootAdmin", rootAdminRoutes);
app.use("/api/v1/admin/quizzes", adminQuizRoutes);
app.use("/api/v1/content", contentRoutes);

// User-related routes
app.use("/api/v1/user/quiz", userQuizRoutes);
app.use("/api/v1/user/coins", userCoinsRoutes);
app.use("/api/v1/user", portfolioRoute);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/newsTrigger", triggerRoute);

// Health check route for Render
app.get("/", (req, res) => {
  res.send("🎉 SavingsYogi Backend is running on Render!");
});

// Start server
const startServer = async () => {
  await connectDB();

  // ✅ Redis check (optional)
  try {
    await redisClient.connect();
    console.log("✅ Redis connected");
  } catch (err) {
    console.error("⚠️ Redis connection failed:", err.message);
  }

  startScheduler();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
