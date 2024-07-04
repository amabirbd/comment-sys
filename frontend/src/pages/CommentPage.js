// src/pages/CommentPage.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../context/CommentContext';
import Comment from '../components/Comments/Comments';
import CommentForm from '../components/Comments/CommentForm';

const CommentPage = () => {
  const { id } = useParams();
  const { comments, loading } = useContext(CommentContext);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const foundComment = comments.find(comment => comment._id === id);
    setComment(foundComment);
  }, [comments, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!comment) {
    return <p>Comment not found</p>;
  }

  return (
    <div>
      <h1>Comment Details</h1>
      <Comment comment={comment} />
      {/* <h2>Replies</h2>
      <CommentForm parentId={comment._id} />
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply._id} comment={reply} />
      ))} */}
    </div>
  );
};

export default CommentPage;
