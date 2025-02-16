import { useDispatch, useSelector } from "react-redux";
import {
  setMemberId,
  setIsCouple,
  setIsAuthenticated,
  setUser,
  setEmail,
  resetAuth,
  selectMemberId,
  selectIsCouple,
  selectIsAuthenticated,
  selectUser,
  selectEmail,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const memberId = useSelector(selectMemberId);
  const isCouple = useSelector(selectIsCouple);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const email = useSelector(selectEmail);
  const updateMemberId = (newMemberId) => dispatch(setMemberId(newMemberId));
  const updateIsCouple = (value) => dispatch(setIsCouple(value));
  const updateIsAuthenticated = (value) => dispatch(setIsAuthenticated(value));
  const updateUser = (userData) => dispatch(setUser(userData));
  const updateEmail = (newEmail) => dispatch(setEmail(newEmail));
  const logout = () => dispatch(resetAuth());

  
  return {
    memberId,
    isCouple,
    isAuthenticated,
    user,
    email,
    updateMemberId,
    updateIsCouple,
    updateIsAuthenticated,
    updateUser,
    updateEmail,
    logout,
  };
};

//import { useAuth } from "../hooks/useAuth";
//const { isAuthenticated, user, updateIsAuthenticated, updateUser, logout } = useAuth();