import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

const Verify = () => {
  const navigate = useNavigate();
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
    `api/auth/login/kakao?code=${code}`
  );
  console.log(data);

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
        alert("회원가입이 필요합니다.");
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
