import klogin from '../assets/klogin.webp';

const KakaoLoginREST = () => {
  // 환경 변수나 설정에서 가져올 값들
  const REST_API_KEY = "e0263267f41ac7bffe253278e44d8600";
  const REDIRECT_URI = "http://localhost:5173/auth";

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