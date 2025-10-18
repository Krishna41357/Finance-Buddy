import dotenv from "dotenv";
dotenv.config();

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import contactRoutes from "./routes/contactRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cron from "node-cron";
import redisClient from "./utils/redisClient.js";
import path from "path";
// import addBlogRoute from "./routes/addBlogRoutes.js"; // Import blog routes
import blogCacheRoutes from "./routes/blogCacheRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rootAdminRoutes from "./routes/rootAdminRoutes.js";
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import likeViewRoutes from "./routes/likeViewRoutes.js";
import adminQuizRoutes from "./routes/adminQuizRoutes.js"
import userCoinsRoutes from "./routes/userCoinsRoutes.js"
import userQuizRoutes from "./routes/userQuizRoutes.js"
import contentRoutes from "./routes/contentRoutes.js"
// portfolio
import portfolioRoute from "./routes/portfolioRoutes.js";
import commentRoutes from './routes/commentRoutes.js';
import triggerRoute from './routes/triggerRoute.js';
import { startScheduler } from './scheduler.js';


import { setupGoogleStrategy } from "./Controllers/authController.js";


setupGoogleStrategy();

const app = express();

// Environment variables
const PORT = process.env.PORT || 8000;
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  MONGO_DB
} = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

// Now connect mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// CORS options
const corsOptions = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Initialize passport middleware
app.use(passport.initialize());

//static
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
// app.use("/api/v1/addBlogRoute",addBlogRoute)
app.use("/api/v1/blogCache", blogCacheRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/article", likeViewRoutes);


//Admin Routes
app.use('/api/v1/auth/admin', adminAuthRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/rootAdmin" , rootAdminRoutes);
app.use("/api/v1/admin/quizzes", adminQuizRoutes);
  app.use('/api/v1/content', contentRoutes);
// quiz
app.use("/api/v1/user/quiz", userQuizRoutes);

// coins
app.use("/api/v1/user/coins", userCoinsRoutes);

// portfolio
app.use("/api/v1/user", portfolioRoute);

// comments
app.use('/api/v1/comments', commentRoutes);

//feed scheduler 
app.use('/api/v1/newsTrigger', triggerRoute);


// Optional: Basic test route
app.get("/", (req, res) => {
  res.send("🎉 SavingsYogi Backend is running!");
});

// MongoDB connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  }
};
// Cron job: Sync Redis → MongoDB every 30 seconds (adjust as needed)
// cron.schedule("*/30 * * * * ", async () => {
//   console.log("⏳ Cron job: syncing Redis → MongoDB");

//   try {
//     const keys = await redisClient.keys("article:*:*");
//     const countsMap = {};

//     for (const key of keys) {
//       const [, articleId, type] = key.split(":");
//       const count = await redisClient.sCard(key);
//       if (!countsMap[articleId]) countsMap[articleId] = { views: 0, likes: 0 };
//       countsMap[articleId][type] = count;
//     }

//     for (const [articleId, counts] of Object.entries(countsMap)) {
//       await Article.findByIdAndUpdate(articleId, {
//         views: counts.views,
//         likes: counts.likes,
//       });
//     }

//     console.log("✅ Redis counts synced to MongoDB");
//   } catch (err) {
//     console.error("❌ Cron job error:", err);
//   }
// });

// // Graceful shutdown: Sync Redis → MongoDB
// process.on("SIGINT", async () => {
//   console.log("🛑 Server shutting down. Syncing Redis to MongoDB...");
//   try {
//     const keys = await redisClient.keys("article:*:*");
//     const countsMap = {};

//     for (const key of keys) {
//       const [, articleId, type] = key.split(":");
//       const count = await redisClient.sCard(key);
//       if (!countsMap[articleId]) countsMap[articleId] = { views: 0, likes: 0 };
//       countsMap[articleId][type] = count;
//     }

//     for (const [articleId, counts] of Object.entries(countsMap)) {
//       await Article.findByIdAndUpdate(articleId, {
//         views: counts.views,
//         likes: counts.likes,
//       });
//     }

//     console.log("✅ Redis sync completed.");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Shutdown sync error:", err);
//     process.exit(1);
//   }
// });



// // Start server after DB connects
const startServer = async () => {
  await connectDB();
  startScheduler();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
