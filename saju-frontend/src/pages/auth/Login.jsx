import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import KakaoLoginREST from '../../components/KakaoLoginREST';
import useFetchData from '../../hooks/useFetchData';

function LogInPage() {
  const navigate = useNavigate();
  const { data: authStatus, isLoading, error } = useFetchData('/api/auth/login/kakao', 'authStatus');

  useEffect(() => {
    if (!isLoading && authStatus) {
      // 로그인 상태에 따른 분기 처리
      if (!authStatus.isLogin) {
        // 이미 로그인 페이지에 있으므로 아무 작업도 하지 않음
        return;
      }
      
      if (authStatus.isLogin && authStatus.isCouple === null) {
        navigate('/auth/signup/additional');
        return;
      }
      
      if (authStatus.isLogin && authStatus.isCouple === false) {
        navigate('/solo');
        return;
      }
      
      if (authStatus.isLogin && authStatus.isCouple === true) {
        navigate('/couple');
        return;
      }
    }
  }, [authStatus, isLoading, navigate]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <KakaoLoginREST />
    </div>
  );
}

export default LogInPage;