import axios from 'axios';
const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_BASE = `${BASE_API}/api/v1/user/quiz`;

// Axios instance that always sends the token from AuthContext
const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');   // AuthContext writes here
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllQuizzes = () => api.get('/quizData').then(r => r.data);
export const getUserStats   = (userId) => api.get(`/${userId}/stats`).then(r => r.data);
export const markQuizTaken  = (userId, quizId) =>
  api.post(`/${userId}/taken`, { quizId }).then(r => r.data);