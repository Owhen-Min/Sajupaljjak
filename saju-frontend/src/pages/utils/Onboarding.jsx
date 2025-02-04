import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';


function OnboardingPage() {
  const navigate = useNavigate();
  
  // 임시 상태 처리 함수들
  const handleNotLoggedIn = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleNoFinishedSignUp = () => {
    // 커플 등록 페이지로 이동
    navigate('/sign-up');
  };

  const handleNoCoupleStatus = () => {
    navigate('/solo');
  };

  const handleCoupleStatus = () => {
    navigate('/couple');
  };

  return (
    <div className="onboarding">
      <img src={logo} alt="logo" />
      <h4 className="onboarding-title text-red-500">상태에 따른 분기점</h4>
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