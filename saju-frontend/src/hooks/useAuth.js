import { useDispatch, useSelector } from "react-redux";
import {
  setMemberId,
  setRelation,
  setIsAuthenticated,
  setUser,
  setEmail,
  setAccessToken,
  resetAuth,
  selectMemberId,
  selectRelation,
  selectIsAuthenticated,
  selectUser,
  selectEmail,
  selectAccessToken,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const memberId = useSelector(selectMemberId);
  const relation = useSelector(selectRelation);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const email = useSelector(selectEmail);
  const accessToken = useSelector(selectAccessToken);
  const updateMemberId = (newMemberId) => dispatch(setMemberId(newMemberId));
  const updateRelation = (value) => dispatch(setRelation(value));
  const updateIsAuthenticated = (value) => dispatch(setIsAuthenticated(value));
  const updateUser = (userData) => dispatch(setUser(userData));
  const updateEmail = (newEmail) => dispatch(setEmail(newEmail));
  const updateAccessToken = (newAccessToken) => dispatch(setAccessToken(newAccessToken));
  const logout = () => dispatch(resetAuth());

  
  return {
    memberId,
    relation,
    isAuthenticated,
    user,
    email,
    accessToken,
    updateMemberId,
    updateRelation,
    updateIsAuthenticated,
    updateUser,
    updateEmail,
    updateAccessToken,
    logout,
  };
};

//import { useAuth } from "../hooks/useAuth";
//const { isAuthenticated, user, updateIsAuthenticated, updateUser, logout } = useAuth();