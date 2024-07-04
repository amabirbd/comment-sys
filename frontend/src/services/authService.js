// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, credentials);
  return response.data;
};

// const getCurrentUser = async () => {
//   const response = await axios.get(`${API_URL}/api/auth/me`);
//   return response.data;
// };

export default {
  login,
  register
};
