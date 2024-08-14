import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.css';

const CommentList = ({ comments, onRemove, onUpdate, onRemoveReply }) => {
  return (
    <div className="comment-list">
      {comments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onRemove={onRemove}
            onUpdate={onUpdate}
            onRemoveReply={onRemoveReply}
          />
        ))}
    </div>
  );
};

export default CommentList;
