import klogin from "../assets/klogin.webp";
import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoLoginREST = ({ className }) => {
  // 환경 변수에서 값을 가져오도록 수정
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const handleLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <div>
      {/*
      <img
        onClick={handleLogin}
        src={klogin}
        alt="카카오 로그인"
        className={className}
        style={{
          display: "block",
          margin: "0 auto",
          cursor: "pointer",
        }}
      /> */}
      <div
        className={`flex items-center justify-center w-full cursor-pointer ${className}`}
        onClick={handleLogin}
      >
        <div className="font-semibold text-[#3a1d1d] bg-[#ffcd00] w-[250px] h-[50px] flex items-center justify-center gap-x-3 rounded-md">
          <RiKakaoTalkFill className="h-7 w-7" />
          <div>카카오톡으로 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginREST;
