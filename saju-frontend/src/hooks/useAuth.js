import { useDispatch, useSelector } from "react-redux";
import {
  setMemberId,
  setRelation,
  setIsAuthenticated,
  setUser,
  setEmail,
  resetAuth,
  selectMemberId,
  selectRelation,
  selectIsAuthenticated,
  selectUser,
  selectEmail,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const memberId = useSelector(selectMemberId);
  const relation = useSelector(selectRelation);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const email = useSelector(selectEmail);
  const updateMemberId = (newMemberId) => dispatch(setMemberId(newMemberId));
  const updateRelation = (value) => dispatch(setRelation(value));
  const updateIsAuthenticated = (value) => dispatch(setIsAuthenticated(value));
  const updateUser = (userData) => dispatch(setUser(userData));
  const updateEmail = (newEmail) => dispatch(setEmail(newEmail));
  const logout = () => dispatch(resetAuth());

  
  return {
    memberId,
    relation,
    isAuthenticated,
    user,
    email,
    updateMemberId,
    updateRelation,
    updateIsAuthenticated,
    updateUser,
    updateEmail,
    logout,
  };
};

//import { useAuth } from "../hooks/useAuth";
//const { isAuthenticated, user, updateIsAuthenticated, updateUser, logout } = useAuth();