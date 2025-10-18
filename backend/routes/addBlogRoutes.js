// import express from "express";
// import { 
//     saveBlog, 
//     upload, 
//     getAllBlog, 
//     getBlog,
//     updateBlog,
//     deleteBlog
// } from "../Controllers/addBlogController.js";
// import { verifyToken } from "../utils/verifyToken.js"; // Correctly import named export

// const router = express.Router();

// // Protected routes
// router.post("/saveBlog", verifyToken, upload.single('featuredImage'), saveBlog);
// router.put("/updateBlog/:id", verifyToken, upload.single('featuredImage'), updateBlog);
// router.delete("/deleteBlog/:id", verifyToken, deleteBlog);

// // Public routes
// router.get("/getAllBlog", getAllBlog);
// router.get("/getBlogById/:id", getBlog);

// export default router;
