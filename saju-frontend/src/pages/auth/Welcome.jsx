import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainButton from "../../components/MainButton";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // 브라우저의 뒤로가기 방지
    history.pushState(null, "", location.href);
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
    };
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, []);

  return (
    <div className="welcome flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl text-gray-700 font-bold mb-8">
        회원가입이 완료되었습니다!
      </h1>
      <h3 className="text-base mb-2 text-gray-700">
        적절한 서비스를 제공하기 위해
      </h3>
      <h3 className="text-base mb-8 text-gray-700">추가적인 질문을 할게요.</h3>
      <MainButton
        onClick={() => navigate("/auth/signup/additional")}
        className="w-1/2 py-3 bg-[#ff7070] text-white"
      >
        추가정보 입력하기
      </MainButton>
    </div>
  );
}

export default Welcome;
