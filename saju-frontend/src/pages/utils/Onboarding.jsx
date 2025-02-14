import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';


function OnboardingPage() {
  const navigate = useNavigate();
  
  // 임시 상태 처리 함수들
  const handleNotLoggedIn = () => {
    // 로그인 페이지로 이동
    navigate('/auth/');
  };

  const handleNoFinishedSignUp = () => {
    // 커플 등록 페이지로 이동
    navigate('/auth/signup/additional');
  };

  const handleNoCoupleStatus = () => {
    navigate('/solo');
  };

  const handleCoupleStatus = () => {
    navigate('/couple');
  };

  return (
    <div className="onboarding bg-gray-100 h-screen py-20 text-center">
      <div className="flex flex-col justify-center items-center w-full h-auto px-8 mb-20">
        <img src={logo} alt="logo" className="w-1/2 h-1/2 mb-5" />
        <h1 className="text-5xl font-gapyeong"><span className="text-black">사주팔</span><span className="text-red-500">짝</span></h1>
      </div>
      <h4 className="onboarding-title text-blue-500">상태에 따른 분기점</h4>
      <div className="onboarding-buttons">
        <button onClick={handleNotLoggedIn}>
          isLogin이 False일 때
        </button>
        <button onClick={handleNoFinishedSignUp}>
          isLogin이 True이고 isCouple이 null일 때
        </button>
        <button onClick={handleNoCoupleStatus}>
          isLogin이 True이고 isCouple이 false일 때
        </button>
        <button onClick={handleCoupleStatus}>
          isLogin이 True이고 isCouple이 true일 때
        </button>
      </div>
    </div>

    
  );
}

export default OnboardingPage;