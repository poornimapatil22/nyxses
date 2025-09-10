// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice/authSlice';
import customersReducer from '../features/Dashboard/slice/Customerslice';
// ^ path must match your project; ensure casing matches the filename exactly

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer, // ✅ key matches selectors
  },
});

export default store;
