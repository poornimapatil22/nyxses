import { publicApi, authApi } from '../../../services/axios';

// You said login returns BOTH token and user info
export const loginRequest = (payload) =>
  publicApi.post('/rest/public/jwt/login', payload); // adjust path if needed

// Used on app load when token exists
export const getCurrentUser = () =>
  authApi.get('/rest/private/users/current');

export const ForgetPasswordRequest = (payload) =>
  publicApi.get(`/rest/public/passwordReset/recover/${encodeURIComponent(payload)}`); // adjust path if needed
