// controllers/adminBlogController.js
import Article from '../models/Article.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        
        // Ensure uploads directory exists with better error handling
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
                console.log('✅ Created uploads directory:', uploadDir);
            } else {
                console.log('✅ Uploads directory already exists:', uploadDir);
            }
            cb(null, uploadDir);
        } catch (error) {
            console.error('❌ Error creating uploads directory:', error);
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        console.log('📁 Saving file as:', filename);
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, GIF, and WebP files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024, // Increased to 10MB
        files: 1 // Only allow 1 file
    }
});

// Multer error handler middleware
export const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({ 
                    message: 'File too large. Maximum size allowed is 10MB.',
                    error: 'FILE_TOO_LARGE'
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({ 
                    message: 'Too many files. Only 1 file is allowed.',
                    error: 'TOO_MANY_FILES'
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({ 
                    message: 'Unexpected file field.',
                    error: 'UNEXPECTED_FILE'
                });
            default:
                return res.status(400).json({ 
                    message: 'File upload error.',
                    error: error.code
                });
        }
    } else if (error) {
        return res.status(400).json({ 
            message: error.message || 'File upload error.',
            error: 'UPLOAD_ERROR'
        });
    }
    next();
};

export { upload };

// Helper function to ensure uploads directory exists
const ensureUploadsDirectory = () => {
    const uploadDir = 'uploads/';
    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('✅ Created uploads directory:', uploadDir);
        }
        return true;
    } catch (error) {
        console.error('❌ Failed to create uploads directory:', error);
        return false;
    }
};

// Call this function when the module loads
ensureUploadsDirectory();

// Helper function to safely delete old image
const deleteOldImage = (imagePath) => {
    if (imagePath && fs.existsSync(imagePath)) {
        try {
            fs.unlinkSync(imagePath);
            console.log(`Deleted old image: ${imagePath}`);
        } catch (error) {
            console.error(`Failed to delete old image: ${imagePath}`, error);
        }
    }
};

// ✅ Create new article
export async function createArticle(req, res) {
    try {
        console.log('📝 Creating article with data:', req.body);
        console.log('📸 File uploaded:', req.file ? req.file.path : 'No file');

        const { type, title, url, summary, content, label, source, scrapedAt } = req.body;
        const featuredImage = req.file ? req.file.path : null;

        const parsedLabel = typeof label === 'string'
          ? label.split(',').map(item => item.trim()).filter(item => item)
          : Array.isArray(label) ? label : [];

        if (!type || !['blog', 'news'].includes(type)) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: "Type must be 'blog' or 'news'." });
        }

        if (!title) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: "Title is required." });
        }

        const newArticle = new Article({
            type,
            title,
            url,
            summary,
            content,
            label: parsedLabel,
            source,
            scrapedAt: scrapedAt ? new Date(scrapedAt) : undefined,
            featuredImage
        });

        await newArticle.save();
        console.log('✅ Article saved successfully with image:', featuredImage);

        res.status(201).json({ message: "Article created successfully!", data: newArticle });
    } catch (error) {
        console.error("❌ Error creating article:", error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: "Failed to create article.", error: error.message });
    }
}


// ✅ Get all articles
export async function getAllArticles(req, res) {
    try {
        const articles = await Article.find().sort({ scrapedAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).json({ message: "Failed to retrieve articles.", error: error.message });
    }
}

// ✅ Get article by ID
export async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) return res.status(404).json({ message: "Article not found." });
        res.status(200).json(article);
    } catch (error) {
        console.error("Error retrieving article:", error);
        res.status(500).json({ message: "Failed to retrieve article.", error: error.message });
    }
}

// ✅ Delete article
export async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) return res.status(404).json({ message: "Article not found." });

        // Delete associated image file
        if (article.featuredImage) {
            deleteOldImage(article.featuredImage);
        }

        await Article.findByIdAndDelete(id);
        res.status(200).json({ message: "Article deleted successfully." });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Failed to delete article.", error: error.message });
    }
}

// ✅ Update article (IMPROVED VERSION)
export async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (typeof updates.label === 'string') {
            updates.label = updates.label.split(',').map(item => item.trim()).filter(item => item);
        }

        const removeImage = updates.removeImage === 'true' || updates.removeImage === true;

        const article = await Article.findById(id);
        if (!article) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: "Article not found." });
        }

        const oldImagePath = article.featuredImage;
        const allowedFields = ['type', 'title', 'url', 'summary', 'content', 'label', 'source', 'scrapedAt'];

        for (let key of allowedFields) {
            if (updates[key] !== undefined && updates[key] !== '') {
                if (key === 'scrapedAt') {
                    article[key] = new Date(updates[key]);
                } else {
                    article[key] = updates[key];
                }
            }
        }

        if (req.file) {
            article.featuredImage = req.file.path;
            if (oldImagePath && oldImagePath !== req.file.path) {
                deleteOldImage(oldImagePath);
            }
        } else if (removeImage) {
            if (oldImagePath) {
                deleteOldImage(oldImagePath);
            }
            article.featuredImage = null;
        }

       const updatedArticle = await article.save();

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';
const fullImagePath = updatedArticle.featuredImage
  ? `${BASE_URL}/${updatedArticle.featuredImage.replace(/\\/g, '/')}`
  : null;

res.status(200).json({
  message: "Article updated successfully!",
  data: {
    ...updatedArticle.toObject(),
    featuredImage: fullImagePath
  }
});


    } catch (error) {
        console.error("Error updating article:", error);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            message: "Failed to update article.",
            error: error.message
        });
    }
}


// ✅ Remove image from article (separate endpoint for explicit image removal)
export async function removeArticleImage(req, res) {
    try {
        const { id } = req.params;
        
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found." });
        }

        // Store old image path for cleanup
        const oldImagePath = article.featuredImage;
        
        // Remove image reference from database
        article.featuredImage = null;
        
        // Save to database first
        const updatedArticle = await article.save();
        
        // Then delete the actual file
        if (oldImagePath) {
            deleteOldImage(oldImagePath);
        }
        
        res.status(200).json({ 
            message: "Article image removed successfully!", 
            data: updatedArticle 
        });
    } catch (error) {
        console.error("Error removing article image:", error);
        res.status(500).json({ 
            message: "Failed to remove article image.", 
            error: error.message 
        });
    }
}

// ✅ Additional helper function to check and fix missing images
export async function checkMissingImages(req, res) {
    try {
        const articles = await Article.find({ featuredImage: { $ne: null } });
        const missingImages = [];
        
        for (const article of articles) {
            if (article.featuredImage && !fs.existsSync(article.featuredImage)) {
                missingImages.push({
                    id: article._id,
                    title: article.title,
                    imagePath: article.featuredImage
                });
            }
        }
        
        res.status(200).json({
            message: `Found ${missingImages.length} articles with missing images`,
            missingImages
        });
    } catch (error) {
        console.error("Error checking missing images:", error);
        res.status(500).json({ message: "Failed to check missing images.", error: error.message });
    }
}

// ✅ Clean up articles with missing images
export async function cleanupMissingImages(req, res) {
    try {
        const articles = await Article.find({ featuredImage: { $ne: null } });
        let cleanedCount = 0;
        
        for (const article of articles) {
            if (article.featuredImage && !fs.existsSync(article.featuredImage)) {
                article.featuredImage = null;
                await article.save();
                cleanedCount++;
            }
        }
        
        res.status(200).json({
            message: `Cleaned up ${cleanedCount} articles with missing images`,
            cleanedCount
        });
    } catch (error) {
        console.error("Error cleaning up missing images:", error);
        res.status(500).json({ message: "Failed to cleanup missing images.", error: error.message });
    }
}