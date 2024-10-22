import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // Initial authentication state is not logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true; // Sets the user as logged in
    },
    logout: (state) => {
      state.isLoggedIn = false; // Sets the user as logged out
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
