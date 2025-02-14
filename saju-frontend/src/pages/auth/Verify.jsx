<<<<<<< HEAD
import { useEffect, useRef } from "react";
=======
import { useEffect } from "react";
>>>>>>> front
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

const Verify = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const requestSent = useRef(false);
=======
>>>>>>> front
  const {
    updateMemberId,
    updateEmail,
    updateIsCouple,
    updateUser,
    updateIsAuthenticated,
    logout,
  } = useAuth();

  const code = new URL(window.location.href).searchParams.get("code");
  const { data, error, isLoading } = useGet(
<<<<<<< HEAD
    requestSent.current ? null : `api/auth/login/kakao?code=${code}`
  );

  useEffect(() => {
    if (!requestSent.current && code) {
      requestSent.current = true;
    }
  }, [code]);
=======
    `api/auth/login/kakao?code=${code}`
  );
  console.log(data);
>>>>>>> front

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error(error);
      window.alert("서버 통신중 오류가 발생했습니1다.");
      navigate("/auth", { state: { error: error.message } });
      return;
    }

    if (data) {
      console.log(data);
      logout();
      updateEmail(data.email);

      if (!data.token) {
<<<<<<< HEAD
        navigate("/signup");
=======
        navigate("/auth/signup");
>>>>>>> front
        return;
      }

      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("refreshToken", data.token.refreshToken);
      localStorage.setItem("memberId", data.memberId);
      
      updateMemberId(data.memberId);
      updateUser(data.user);
      updateIsAuthenticated(true);
      updateIsCouple(data.relation);

      if (data.isCouple === null) {
        navigate("/auth/additionalSignUp");
        return;
      }

      navigate(data.isCouple ? "/couple" : "/solo");
    }
  }, [
    data,
    error,
    isLoading,
    navigate,
    updateMemberId,
    updateEmail,
    updateUser,
    updateIsAuthenticated,
    updateIsCouple,
    logout,
  ]);



  return null;
};

export default Verify;
