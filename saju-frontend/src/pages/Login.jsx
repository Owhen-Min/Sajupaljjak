import logo from '../assets/logo.webp';
import KakaoLoginREST from '../components/KakaoLoginREST';
import { useNavigate } from 'react-router-dom';

function LogInPage() {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_KAKAO_REST_API_KEY);
  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <KakaoLoginREST />
      <br/>
      <button onClick={() => navigate('/sign-up?email=abc@def.com')}>회원가입으로 이동</button>
    </div>
  );
}

export default LogInPage;