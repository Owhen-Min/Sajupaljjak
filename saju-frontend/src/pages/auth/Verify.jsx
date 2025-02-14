import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

const Verify = () => {
  const navigate = useNavigate();
  const requestSent = useRef(false);
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
    code ? `api/auth/login/kakao?code=${code}` : null,
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: !!code,
    }
  );
  console.log(`첫 응답 : ${data}`);

  useEffect(() => {
    if (!requestSent.current && code) {
      requestSent.current = true;
    }

    if (isLoading) return;

    if (error) {
      console.error(error);
      window.alert("서버 통신중 오류가 발생했습니다.");
      navigate("/auth", { state: { error: error.message } });
      return;
    }

    if (data) {
      console.log(`둘 째 응답 : ${data}`);
      logout();
      updateEmail(data.email);

      if (!data.token) {
        navigate("/auth/signup");
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
