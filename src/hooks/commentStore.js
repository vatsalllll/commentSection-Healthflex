import create from 'zustand';

const useCommentDataStore = create((set) => ({
  comments: JSON.parse(localStorage.getItem('comments')) || [],

  addComment: (newComment) => set((state) => {
    const updatedComments = [...state.comments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  deleteComment: (commentId) => set((state) => {
    const filteredComments = state.comments.filter(c => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(filteredComments));
    return { comments: filteredComments };
  }),

  editComment: (commentId, newText) => set((state) => {
    const modifiedComments = state.comments.map(c => c.id === commentId ? { ...c, text: newText } : c);
    localStorage.setItem('comments', JSON.stringify(modifiedComments));
    return { comments: modifiedComments };
  }),

  addReply: (commentId, reply) => set((state) => {
    const modifiedComments = state.comments.map(c =>
      c.id === commentId
        ? { ...c, replies: [...(c.replies || []), reply] }
        : c
    );
    localStorage.setItem('comments', JSON.stringify(modifiedComments));
    return { comments: modifiedComments };
  }),

  deleteReply: (commentId, replyId) => set((state) => {
    const modifiedComments = state.comments.map(c =>
      c.id === commentId
        ? { ...c, replies: (c.replies || []).filter(r => r.id !== replyId) }
        : c
    );
    localStorage.setItem('comments', JSON.stringify(modifiedComments));
    return { comments: modifiedComments };
  }),

  loadComments: () => set(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    return { comments: savedComments };
  }),
}));

export default useCommentDataStore;
