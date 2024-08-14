import React, { useState } from 'react';
import useCommentDataStore from '../../hooks/commentStore';
import './CommentForm.css';

const CommentForm = ({ parentId }) => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const addNewComment = useCommentDataStore((state) => state.addComment);
  const addNewReply = useCommentDataStore((state) => state.addReply);

  const handleSubmission = (e) => {
    e.preventDefault();
    if (userName && commentText) {
      const commentData = {
        id: Date.now(),
        name: userName,
        text: commentText,
        date: new Date().toISOString(),
        replies: []
      };
      if (parentId) {
        const replyData = {
          id: Date.now(),
          name: userName,
          text: commentText,
          date: new Date().toISOString(),
        };
        addNewReply(parentId, replyData);
      } else {
        addNewComment(commentData);
      }
      setUserName('');
      setCommentText('');
    } else {
      alert('Please enter both name and comment.');
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your Name"
      />
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Your Comment"
      ></textarea>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
