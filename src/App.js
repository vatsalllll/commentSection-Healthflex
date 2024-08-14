import React, { useEffect } from 'react';
import CommentList from './components/CommentItem/CommentList';
import CommentForm from './components/CommentForm/CommentForm';
import useCommentStore from './hooks/commentStore';
import './App.css';
import './components/styles/global.css';

const App = () => {
  const allComments = useCommentStore((state) => state.comments);
  const removeComment = useCommentStore((state) => state.deleteComment);
  const updateComment = useCommentStore((state) => state.editComment);
  const removeReply = useCommentStore((state) => state.deleteReply);
  const initializeComments = useCommentStore((state) => state.loadComments);

  useEffect(() => {
    initializeComments();
  }, [initializeComments]);

  return (
    <div className="App">
      <h1>Comment Section</h1>
      <CommentForm />
      {allComments && allComments.length > 0 ? (
        <CommentList
          comments={allComments}
          onRemove={removeComment}
          onUpdate={updateComment}
          onRemoveReply={removeReply}
        />
      ) : (
        <p>No comments yet. Be the first to contribute!</p>
      )}
    </div>
  );
};

export default App;
