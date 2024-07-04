// src/services/commentService.js

import axios from '../utils/api';

const getComments = async () => {
  const response = await axios.get('/api/comments');
  return response.data;
};

const addComment = async (comment) => {
  const response = await axios.post('/api/comments', comment);
  return response.data;
};

const likeComment = async (commentId) => {
  const response = await axios.put(`/api/comments/${commentId}/like`);
  return response.data;
};

const dislikeComment = async (commentId) => {
  const response = await axios.put(`/api/comments/${commentId}/dislike`);
  return response.data;
};

const replyToComment = async (commentId, reply) => {
  const response = await axios.post(`/api/comments/${commentId}/reply`, reply);
  return response.data;
};

export default {
  getComments,
  addComment,
  likeComment,
  dislikeComment,
  replyToComment,
};
