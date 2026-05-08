import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor to include the auth token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
