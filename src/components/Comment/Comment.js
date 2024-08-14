import React, { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import './Comment.css';

const Comment = ({ comment, onRemove, onUpdate, onRemoveReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.text);
  const [repliesVisible, setRepliesVisible] = useState(false);

  const initiateEdit = () => setIsEditing(true);
  const saveEdit = () => {
    onUpdate(comment.id, editedContent);
    setIsEditing(false);
  };

  const toggleRepliesVisibility = () => setRepliesVisible(!repliesVisible);

  return (
    <div className="comment">
      <h4>{comment.name} on {new Date(comment.date).toLocaleString()}</h4>
      {isEditing ? (
        <div>
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
      <button onClick={() => onRemove(comment.id)}>Delete</button>
      {!isEditing && <button onClick={initiateEdit}>Edit</button>}
      <button onClick={toggleRepliesVisibility}>
        {repliesVisible ? 'Hide Replies' : (comment.replies && comment.replies.length > 0) ? 'Show Replies' : 'Reply'}
      </button>
      {repliesVisible && (
        <div>
          {comment.replies && comment.replies.map((reply) => (
            <div key={reply.id} className="reply">
              <h5>{reply.name} on {new Date(reply.date).toLocaleString()}</h5>
              <p>{reply.text}</p>
              <button onClick={() => onRemoveReply(comment.id, reply.id)}>Delete Reply</button>
            </div>
          ))}
          <CommentForm parentId={comment.id} />
        </div>
      )}
    </div>
  );
};

export default Comment;
