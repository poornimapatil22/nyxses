import axios from 'axios';

// Public (no token) requests
export const publicApi = axios.create({
  baseURL: '/api', // works with Vite proxy
  timeout: 20000,
});

// Authenticated requests
export const authApi = axios.create({
  baseURL: '/api',
  timeout: 20000,
});

// Helper to set token on authApi
export const setAuthToken = (token) => {
  if (token) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }
};

// Helper to clear token
export const clearAuthToken = () => {
  delete authApi.defaults.headers.common.Authorization;
  localStorage.removeItem('token');
};

// Restore token on page reload
const savedToken = localStorage.getItem('token');
if (savedToken) setAuthToken(savedToken);

export default {
  publicApi,
  authApi,
  setAuthToken,
  clearAuthToken,
};
