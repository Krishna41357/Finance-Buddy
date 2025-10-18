import ArticleComments from '../models/ArticleComments.js';

// Add a comment
export const addComment = async (req, res) => {
  const { articleId, userId, comment } = req.body;

  if (!articleId || !userId || !comment) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let doc = await ArticleComments.findOne({ articleId });

    if (!doc) {
      doc = new ArticleComments({ articleId });
    }

    const commentsArray = doc.commentsMap.get(userId) || [];
    commentsArray.push({ comment, createdAt: new Date() });

    doc.commentsMap.set(userId, commentsArray);
    await doc.save();

    return res.status(200).json({ message: "Comment added", data: doc });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all comments for an article
export const getCommentsByArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const doc = await ArticleComments.findOne({ articleId });

    if (!doc) {
      return res.status(404).json({ message: "No comments found" });
    }

    return res.status(200).json({ commentsMap: doc.commentsMap });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a comment by index
export const deleteComment = async (req, res) => {
  const { articleId, userId, index } = req.body;

  if (typeof index !== 'number') {
    return res.status(400).json({ message: "Index must be a number" });
  }

  try {
    const doc = await ArticleComments.findOne({ articleId });

    if (!doc) {
      return res.status(404).json({ message: "Article not found" });
    }

    const commentsArray = doc.commentsMap.get(userId);
    if (!commentsArray || index < 0 || index >= commentsArray.length) {
      return res.status(404).json({ message: "Comment not found" });
    }

    commentsArray.splice(index, 1); // remove the comment
    doc.commentsMap.set(userId, commentsArray);
    await doc.save();

    return res.status(200).json({ message: "Comment deleted", data: doc });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const addReply = async (req, res) => {
  const { articleId, userId, parentUserId, parentCommentIndex, reply } = req.body;

  if (!articleId || !userId || !parentUserId || reply == null || parentCommentIndex == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const doc = await ArticleComments.findOne({ articleId });
    if (!doc) return res.status(404).json({ message: "Article not found" });

    const userComments = doc.commentsMap.get(parentUserId);
    if (!userComments || !userComments[parentCommentIndex]) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    userComments[parentCommentIndex].replies.push({
      userId,
      comment: reply,
      createdAt: new Date()
    });

    doc.commentsMap.set(parentUserId, userComments);
    await doc.save();

    return res.status(200).json({ message: "Reply added", data: doc });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
