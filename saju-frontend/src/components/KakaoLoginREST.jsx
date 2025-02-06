import klogin from '../assets/klogin.webp';

const KakaoLoginREST = () => {
  // 환경 변수에서 값을 가져오도록 수정
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || "http://localhost:5173/auth";

  const handleLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <img 
      onClick={handleLogin}
      src={klogin}
      alt="카카오 로그인" 
      style={{ 
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer'
      }}
    />
  );
};

export default KakaoLoginREST;