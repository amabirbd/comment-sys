// src/components/Comments/CommentList.js
import React, { useContext } from 'react';
import { CommentContext } from '../../context/CommentContext';
import Comments from './Comments';
import CommentForm from './CommentForm';

const CommentList = () => {
  const { comments, loading } = useContext(CommentContext);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <CommentForm />
      {comments.map(comment => (
        <Comments key={comment?._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
