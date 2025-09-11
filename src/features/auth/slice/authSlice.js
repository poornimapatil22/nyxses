// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, getCurrentUser } from "../api/auth.api";
import { setAuthToken, clearAuthToken } from "../../../services/axios";
import { ROUTES } from '../../../config/routes';

/* 1) App-load check (no navigation here) */
export const checkAuthOnLoad = createAsyncThunk(
  "auth/checkAuthOnLoad",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("NO_TOKEN");
    }
    setAuthToken(token);
    try {
      const { data } = await getCurrentUser();
      return { token, user: data };
    } catch {
      clearAuthToken();
      return rejectWithValue("TOKEN_INVALID");
    }
  }
);

/* 2) Login */
export const login = createAsyncThunk(
  "auth/login",
  async (form, { rejectWithValue }) => {
    if (!form.login || !form.password) {
      return rejectWithValue("Login and password are required");
    }
    try {
      const { data } = await loginRequest(form);
      const token = data.id_token ?? null;
      if (!token) {
        return rejectWithValue(data?.message || "Login failed missing token");
      }
      setAuthToken(token);
      localStorage.setItem("token", token);

      try {
        const user = (await getCurrentUser()).data;
        if (!user) {
          clearAuthToken();
          localStorage.removeItem("token");
          return rejectWithValue("Login failed missing user");
        }
        return { token, user };
      } catch (err) {
        clearAuthToken();
        localStorage.removeItem("token");
        return rejectWithValue(
          err?.response?.data?.message || err.message || "Login failed fetching user"
        );
      }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || "Login failed");
    }
  }
);

/* 3) Logout thunk: allow navigation by passing it in */
export const performLogout = createAsyncThunk(
  "auth/performLogout",
  async (navigate , { dispatch }) => {
    clearAuthToken();
    localStorage.removeItem("token");
    dispatch(logout());            // pure state reset
    if (typeof navigate === "function") {
      navigate("/login", { replace: true });  // do side-effect here
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  superAdmin: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.superAdmin = false;
      // no navigation here
    },
  },
  extraReducers: (b) => {
    b
      // check on load
      .addCase(checkAuthOnLoad.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(checkAuthOnLoad.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.superAdmin = !!(payload.user?.data?.superAdmin);
      })
      .addCase(checkAuthOnLoad.rejected, (s, { payload }) => {
        s.loading = false;
        s.user = null;
        s.token = null;
        s.error = payload || null;
      })

      // login
      .addCase(login.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.superAdmin = !!(payload.user?.data?.superAdmin);
      })
      .addCase(login.rejected, (s, { payload, error }) => {
        s.loading = false;
        s.user = null;
        s.token = null;
        s.error = payload || error.message;
      })

      // logout
      .addCase(performLogout.pending, (s) => {
        s.loading = true;
      })
      .addCase(performLogout.fulfilled, (s) => {
        s.loading = false;
        s.user = null;
        s.token = null;
        s.error = null;
        s.superAdmin = false;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthed = (s) => Boolean(s.auth.token);
export const selectAuthLoading = (s) => s.auth.loading;
export const selectAuthError = (s) => s.auth.error;
export const selectUser = (s) => s.auth.user;
