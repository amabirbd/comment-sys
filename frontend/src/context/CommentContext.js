// src/context/CommentContext.js
import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import axios from "../utils/api"

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/comments')
      .then(response => {
        setComments(response.data);
        setLoading(false);
      });
  }, []);

  const addComment = async (text) => {
    const response = await axios.post('/api/comments', { text });
    setComments([...comments, response.data]);
  };

  const likeComment = async (commentId) => {
    const response = await axios.put(`/api/comments/${commentId}/like`);
    setComments(comments.map(comment => 
      comment._id === commentId ? response.data : comment
    ));
  };

  const dislikeComment = async (commentId) => {
    const response = await axios.put(`/api/comments/${commentId}/dislike`);
    setComments(comments.map(comment => 
      comment._id === commentId ? response.data : comment
    ));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, likeComment, dislikeComment, loading }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };
