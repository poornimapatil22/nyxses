import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice/authSlice';
import vendorReducer from '../features/superadmin/dashboard/slice/vendorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vendor: vendorReducer,

  },
  
});

export default store;
