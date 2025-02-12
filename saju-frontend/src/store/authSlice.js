import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCouple: false,
  isAuthenticated: false,
  user: null,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsCouple: (state, action) => {
      state.isCouple = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetAuth: (state) => {
      state.isCouple = false;
      state.isAuthenticated = false;
      state.user = null;
      state.email = "";
    },
  },
});

export const selectIsCouple = (state) => state.auth.isCouple;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;


export const { setIsCouple, setIsAuthenticated, setUser, setEmail, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
