import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/apiService';

const Verify = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processKakaoLogin = async () => {
      // URL에서 인가 코드 추출
      const code = new URL(window.location.href).searchParams.get("code");
      
      try {
        // 백엔드 서버로 인가 코드 전송
        const { data } = await post('/auth/kakao', { code });

        // 로그인 성공 시 처리
        localStorage.setItem('token', data.token); // 토큰 저장
        navigate('/main'); // 메인 페이지로 이동
      } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        const errorMessage = error.response?.data?.message || '서버 통신 중 오류가 발생했습니다.';
        navigate('/login', { state: { error: errorMessage } });
      } finally {
        setIsLoading(false);
      }
    };

    processKakaoLogin();
  }, [navigate]);

  if (isLoading) {
    return <div>로그인 처리 중...</div>;
  }

  return null;
};

export default Verify;