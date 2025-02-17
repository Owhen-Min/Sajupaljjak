import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import KakaoLoginREST from "../../components/KakaoLoginREST";
import Lottie from "lottie-react";
import Random from "../../assets/animations/heart.json";

function LogInPage() {
  return (
    <div className="login bg-gray-50 h-screen w-full">
      {/* <img src={logo} alt="logo" /> */}
      <div className="h-[70%] w-full flex items-center justify-center flex-col gap-y-3">
        <div style={{ width: 100, height: 100 }}>
          <Lottie animationData={Random} loop={true} />
        </div>
        <div className="font-NanumH text-[#ff7070] font-bold text-3xl">
          사주팔짝
        </div>
        <div className="font-NanumH text-[#ff7070] font-bold text-base">
          운명이 점지해준 단 한사람.
        </div>
      </div>

      <KakaoLoginREST className="w-2/3" />
    </div>
  );
}

export default LogInPage;
