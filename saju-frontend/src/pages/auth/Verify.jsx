import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

const Verify = () => {
  const navigate = useNavigate();
  const requestSent = useRef(false);
  const {
    updateUser,
    updateMemberId,
    updateEmail,
    updateRelation,
    updateIsAuthenticated,
    logout,
  } = useAuth();

  const code = new URL(window.location.href).searchParams.get("code");
  const { data, error, isPending } = useGet(
    code ? `api/auth/login/kakao?code=${code}` : null,
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: !!code,
    }
  );

  useEffect(() => {
    if (!requestSent.current && code) {
      requestSent.current = true;
    }

    if (isPending) return;

    if (error) {
      console.error(error);
      window.alert("서버 통신중 오류가 발생했습니다.");
      navigate("/auth", { state: { error: error.message } });
      return;
    }

    if (data) {
      logout();
      const { token, ...userData } = data;
      console.log(`받은 데이터 : ${JSON.stringify(data, null, 2)}`);
      updateEmail(data.email);
      console.log(`받은 이메일 :  ${data.email}`);
      if (!data.token) {
        alert("회원가입이 필요합니다.");
        navigate("/auth/signup");
        return;
      }

      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("refreshToken", data.token.refreshToken);
      localStorage.setItem("memberId", data.memberId);
      
      updateUser(userData);
      updateMemberId(data.memberId);
      updateRelation(data.relation);
      updateIsAuthenticated(true);

      if (data.relation === null) {
        navigate("/auth/additionalSignUp");
        return;
      }

      navigate(data.relation ? "/couple" : "/solo");
    }
  }, [
    data,
    error,
    isPending,
    navigate,
    updateMemberId,
    updateEmail,
    updateIsAuthenticated,
    updateRelation,
    logout,
    code,
    updateUser,
  ]);


  return null;
};

export default Verify;
