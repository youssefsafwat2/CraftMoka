import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signing up a user
export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post(
    "http://127.0.0.1:3000/api/v1/users/signup",
    userData
  );

  return {
    user: response.data.data.user,
    token: response.data.token,
  };
});

// Async thunk for signing in a user
export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        credentials
      );

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

// Async thunk for handling forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/forgotPassword",
        { email }
      );
      return response.data.message; // Success message from the API
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          "Failed to send reset password email. Please try again."
        );
      }
    }
  }
);

// Async thunk for resetting the password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
        { password, passwordConfirm }
      );

      return response.data; // Assuming the response contains success data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to reset password. Please try again.");
      }
    }
  }
);

// Create a slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    user: null,
    status: "idle",
    error: null,
    resetStatus: "idle", // New state for forgot password
    resetMessage: null, // To store reset success message
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state of the signup process
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.resetStatus = "loading";
        state.resetMessage = null;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.resetStatus = "succeeded";
        state.resetMessage = action.payload; // Success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.resetStatus = "failed";
        state.error = action.payload; // Error message from the API
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetStatus = "loading";
        state.resetMessage = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetStatus = "succeeded";
        state.resetMessage = action.payload.message; // Assuming success message is returned
        state.error = null; // Clear any previous errors
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetStatus = "failed";
        state.error = action.payload; // Capture error message from API
      });
  },
});

// Export actions for login and logout
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
