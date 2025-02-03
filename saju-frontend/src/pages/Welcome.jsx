import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">회원가입이 완료되었습니다!</h1>
      <h3 className="text-lg mb-2">적절한 서비스를 제공하기 위해</h3>
      <h3 className="text-lg mb-8">추가적인 질문을 할게요.</h3>
      <Button onClick={() => navigate('/sign-up-additional')}>
        추가정보 입력하기
      </Button>
    </div>
  );
}

export default WelcomePage;