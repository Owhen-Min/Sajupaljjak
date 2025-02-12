import { useDispatch, useSelector } from "react-redux";
import {
  setIsCouple,
  setIsAuthenticated,
  setUser,
  setEmail,
  resetAuth,
  selectIsCouple,
  selectIsAuthenticated,
  selectUser,
  selectEmail,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isCouple = useSelector(selectIsCouple);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const email = useSelector(selectEmail);
  const updateIsCouple = (value) => dispatch(setIsCouple(value));
  const updateIsAuthenticated = (value) => dispatch(setIsAuthenticated(value));
  const updateUser = (userData) => dispatch(setUser(userData));
  const updateEmail = (newEmail) => dispatch(setEmail(newEmail));
  const logout = () => dispatch(resetAuth());

  return {
    isCouple,
    isAuthenticated,
    user,
    email,
    updateIsCouple,
    updateIsAuthenticated,
    updateUser,
    updateEmail,
    logout,
  };
};

//import { useAuth } from "../hooks/useAuth";
//const { isAuthenticated, user, updateIsAuthenticated, updateUser, logout } = useAuth();