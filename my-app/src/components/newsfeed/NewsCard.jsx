import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';

const NewsCard = ({ title, summary, label, url, type = 'blog', source, scrapedAt }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const articleId = title; // Ideally replace with a unique ID (e.g. article._id)

  const handleLike = async () => {
    setLiked(prev => !prev);
    try {
      await fetch('http://localhost:8000/api/v1/user/likes/demo1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      await fetch('http://localhost:8000/api/v1/user/comments/demo2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, text: newComment }),
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/user/comments/demo3?articleId=${articleId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error('Fetch comments error:', err);
    }
  };

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <div className="bg-white rounded-xl w-full max-w-4xl mx-auto shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 p-6">
      {/* Title */}
      <h3 className="text-2xl font-bold text-left text-gray-900 mb-2">{title || 'Untitled Article'}</h3>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
          type === 'blog'
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
            : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
        }`}>
          {type}
        </span>

        {Array.isArray(label)
          ? label.map((lbl, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
              >
                {lbl}
              </span>
            ))
          : label && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                {label}
              </span>
            )}
      </div>

      {/* Summary */}
      <p className="text-gray-700 mb-6 text-base text-left leading-relaxed">{summary || 'No summary available'}</p>

      {/* Footer: Buttons and Read More */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-4 border-green-50">
        {/* Left Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:shadow-emerald-400 hover:scale-105 transition ${
              liked ? 'text-green-600 shadow-lg' : 'text-gray-600'
            }`}
          >
            <ThumbsUp size={26} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => setShowComments(true)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-600 shadow-md hover:shadow-emerald-400 hover:scale-105 transition"
          >
            <MessageCircle size={26} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right: Read More and Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
          {source && <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">Source: {source}</span>}
          {scrapedAt && <span>{new Date(scrapedAt).toLocaleDateString()}</span>}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium hover:underline transition"
            >
              Read More →
            </a>
          )}
        </div>
      </div>

      {/* Comment Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setShowComments(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">💬 Comments</h2>
            <div className="max-h-[300px] overflow-y-auto space-y-2 mb-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="text-sm border-b pb-1 text-gray-800">
                    <span className="font-semibold">{comment.username || 'Anonymous'}:</span> {comment.text}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="Write your comment..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
