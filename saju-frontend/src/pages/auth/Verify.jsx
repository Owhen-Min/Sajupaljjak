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
        const { data } = await post('api/auth/login/kakao', { code });
        localStorage.setItem('email', data.email);

        // 토큰이 없는 경우 (회원가입 필요)
        if (!data.token) {
          navigate('/signup');
          return;
        }

        // 토큰 저장
        localStorage.setItem('accessToken', data.token.accessToken);
        localStorage.setItem('refreshToken', data.token.refreshToken);
        localStorage.setItem('isCouple', data.token.isCouple);
        
        // isCouple이 null인 경우 (추가 정보 입력 필요)
        if (data.isCouple === null) {
          navigate('/auth/additionalSignUp');
          return;
        }

        // isCouple 값에 따라 적절한 페이지로 이동
        localStorage.setItem('isCouple', data.isCouple);
        navigate(data.isCouple ? '/couple' : '/solo');

      } catch (error) {
        const errorMessage = error.response?.data?.message || '서버 통신 중 오류가 발생했습니다.';
        window.alert(errorMessage)
        navigate('/auth', { state: { error: errorMessage } });
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