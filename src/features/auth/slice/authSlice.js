import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, getCurrentUser } from "../api/auth.api";
import { setAuthToken, clearAuthToken } from "../../../services/axios";
import { useNavigate } from "react-router-dom";

/* 1) App-load check */
export const checkAuthOnLoad = createAsyncThunk(
  "auth/checkAuthOnLoad",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const Navigate = useNavigate();
      Navigate("/login", { replace: true });
    };

    setAuthToken(token); // header ready
    try {
      const { data } = await getCurrentUser();
      return { token, user: data };
    } catch (e) {
      clearAuthToken();
      return rejectWithValue("TOKEN_INVALID");
    }
  }
);

/* 2) Login (expects both token + user in response) */
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
        const msg = data?.message || "Login failed missing token";
        return rejectWithValue(msg);
      }

      setAuthToken(token);

      try {
        const user = (await getCurrentUser()).data;
        if (!user) {
          clearAuthToken();
          return rejectWithValue("Login failed missing user");
        }
        console.log("User fetched successfully:", user);
        return { token, user };
      } catch (err) {
        clearAuthToken();
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Login failed fetching user";
        return rejectWithValue(msg);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

/* 3) Logout thunk to handle side-effects */
export const performLogout = createAsyncThunk(
  "auth/performLogout",
  async (_, { dispatch }) => {
    clearAuthToken();
    localStorage.removeItem("token");
    dispatch(logout()); // plain state reset below
  }
);

const initialState = {
  user: null, // readUser(),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  role: null, // optional: if you want to store user role
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
      state.superAdmin = false; // reset role if needed
      clearAuthToken();
    },
  },
  extraReducers: (b) => {
    // check on load
    b.addCase(checkAuthOnLoad.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(checkAuthOnLoad.fulfilled, (s, { payload }) => {
        s.loading = false;
        if (payload) {
          // <— guard
          s.user = payload.user;
          s.token = payload.token;
          s.superAdmin = payload.user.data.superAdmin || false;
        } else {
          s.user = null;
          s.token = null;
        }
      })
      .addCase(checkAuthOnLoad.rejected, (s, { payload }) => {
        s.loading = false;
        s.user = null;
        s.token = null;
        s.error = payload || null;
      });

    // login
    b.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.superAdmin = payload.user.data.superAdmin || false;
      })
      .addCase(login.rejected, (s, { payload, error }) => {
        s.loading = false;
        s.user = null;
        s.token = null;
        s.error = payload || error.message;
      });
    // performLogout (optional to reflect pending state if you want)
    // dispatch(performLogout()); // handles header + storage + state use of logout reducer

    b.addCase(performLogout.pending, (s) => {
      s.loading = true;
    }).addCase(performLogout.fulfilled, (s) => {
      s.loading = false;
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthed = (s) => Boolean(s.auth.token);
export const selectAuthLoading = (s) => s.auth.loading;
export const selectAuthError = (s) => s.auth.error;
export const selectUser = (s) => s.auth.user;
