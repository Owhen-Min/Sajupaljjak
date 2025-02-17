import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberId: "",
  relation: null,
  isAuthenticated: false,
  user: null,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMemberId: (state, action) => {
      state.memberId = action.payload;
    },
    setRelation: (state, action) => {
      state.relation = action.payload;
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
      state.memberId = "";
      state.relation = 0;
      state.isAuthenticated = false;
      state.user = null;
      state.email = "";
    },
  },
});

export const selectMemberId = (state) => state.auth.memberId;
export const selectRelation = (state) => state.auth.relation;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;


export const {setMemberId, setRelation, setIsAuthenticated, setUser, setEmail, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
