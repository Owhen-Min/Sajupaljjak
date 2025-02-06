import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import KakaoLoginREST from '../../components/KakaoLoginREST';

function LogInPage() {
  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <KakaoLoginREST className="w-2/3" />
    </div>
  );
}

export default LogInPage;