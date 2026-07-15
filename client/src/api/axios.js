import axios from 'axios';

// Base URL of the backend server (without /api), used to build full URLs
// for uploaded images served from /uploads
export const SERVER_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;
