import React, { useState, useEffect, useContext } from 'react';
import { ThumbsUp, MessageCircle, SendHorizonal } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const NewsCard = ({ id, title, summary, label, url, type = 'blog', source, scrapedAt }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [userMap, setUserMap] = useState({});
  const { user } = useContext(AuthContext);
  const userId = user ? user.userId || user._id : 'demo1';
  const [activeReplyBox, setActiveReplyBox] = useState({});
  const articleId = id;
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  const handleLike = async () => {
    setLiked(prev => !prev);
    try {
      await fetch(`${BASE_API}/api/v1/user/likes/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const fetchUsernames = async (ids) => {
    try {
      const res = await fetch(`${BASE_API}/api/v1/users/map?ids=${ids.join(',')}`);
      const data = await res.json();
      setUserMap(data);
    } catch (err) {
      console.error('Error fetching usernames:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${BASE_API}/api/v1/comments/${articleId}`);
      const data = await res.json();
      const parsed = [];

      const userIds = new Set();

      if (data.commentsMap) {
        for (const uid in data.commentsMap) {
          const userComments = data.commentsMap[uid];
          userComments.forEach((comment, idx) => {
            parsed.push({
              userId: uid,
              commentIndex: idx,
              comment: comment.comment,
              createdAt: comment.createdAt,
              replies: comment.replies || []
            });
            userIds.add(uid);
            comment.replies?.forEach(r => userIds.add(r.userId));
          });
        }
      }

      setComments(parsed);
      fetchUsernames([...userIds]);

    } catch (err) {
      console.error('Fetch comments error:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      await fetch(`${BASE_API}/api/v1/comments/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, userId, comment: newComment }),
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const handleReplySubmit = async (parentUserId, commentIndex) => {
    const reply = replyTexts[`${parentUserId}-${commentIndex}`];
    if (!reply) return;
    try {
      await fetch(`${BASE_API}/api/v1/comments/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          userId,
          parentUserId,
          parentCommentIndex: commentIndex,
          reply
        }),
      });
      setReplyTexts(prev => ({ ...prev, [`${parentUserId}-${commentIndex}`]: '' }));
      fetchComments();
    } catch (err) {
      console.error('Reply error:', err);
    }
  };

  const handleReplyChange = (key, val) => {
    setReplyTexts(prev => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          type === 'blog' ? 'bg-green-100 text-green-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {type}
        </span>
        {Array.isArray(label) ? label.map((lbl, idx) => (
          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {lbl}
          </span>
        )) : label && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {label}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-6 text-base">{summary}</p>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full ${liked ? 'text-green-600' : 'text-gray-600'}`}
          >
            <ThumbsUp size={24} />
          </button>
          <button
            onClick={() => setShowComments(true)}
            className="p-2 rounded-full text-gray-600"
          >
            <MessageCircle size={24} />
          </button>
        </div>
        <div className="flex gap-3 items-center">
          {source && <span className="text-green-700">Source: {source}</span>}
          {scrapedAt && <span>{new Date(scrapedAt).toLocaleDateString()}</span>}
          {url && <a href={url} target="_blank" className="text-green-600 hover:underline">Read More →</a>}
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
            <button onClick={() => setShowComments(false)} className="absolute top-3 right-4 text-xl text-green-700 ">&times;</button>
            <h2 className="text-xl font-bold text-green-700 mb-4">Comments 💬</h2>

            {/* Comments */}
            <div className="max-h-[300px] overflow-y-auto space-y-4 mb-4">
              {comments.length === 0 ? (
                <p className="text-center text-emerald-600">No comments yet.</p>
              ) : (
                comments.map((c, i) => (
                  <div key={i} className="bg-emerald-50 p-3 rounded-lg text-left">
                    <div className="text-sm text-gray-800">
                      <span className="font-semibold text-emerald-700">{userMap[c.userId] || 'Anonymous'}:</span> {c.comment}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{new Date(c.createdAt).toLocaleString()}</div>

                    {/* Replies */}
                    {c.replies.map((r, ri) => (
                      <div key={ri} className="ml-4 mt-1 text-sm border-l-2 pl-2 border-emerald-200">
                        <span className="text-emerald-600 font-medium">{userMap[r.userId] || 'User'}:</span> {r.comment}
                        <div className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleString()}</div>
                      </div>
                    ))}

                    {/* Reply Input */}
                   {/* Reply button */}
<div className="ml-2 mt-2">
  <button
    onClick={() => setActiveReplyBox(prev => ({
      ...prev,
      [`${c.userId}-${c.commentIndex}`]: !prev[`${c.userId}-${c.commentIndex}`]
    }))}
    className="text-emerald-600 hover:underline text-xs"
  >
    Reply
  </button>
</div>

{/* Conditionally rendered reply input */}
{activeReplyBox[`${c.userId}-${c.commentIndex}`] && (
  <div className="mt-2 flex items-center gap-2 ml-2">
    <input
      type="text"
      placeholder="Reply..."
      className="flex-1 px-3 py-1 rounded-md border border-emerald-200 text-sm"
      value={replyTexts[`${c.userId}-${c.commentIndex}`] || ''}
      onChange={(e) =>
        handleReplyChange(`${c.userId}-${c.commentIndex}`, e.target.value)
      }
    />
    <button
      onClick={() => handleReplySubmit(c.userId, c.commentIndex)}
      className="bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 text-sm flex items-center gap-1"
    >
      <SendHorizonal size={14} /> Reply
    </button>
  </div>
)}

                  </div>
                ))
              )}
            </div>

            {/* New comment */}
            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="Write your comment..."
                className="flex-1 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-md"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
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
