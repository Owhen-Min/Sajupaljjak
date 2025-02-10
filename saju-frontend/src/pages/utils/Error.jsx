import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp';

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error pt-10">
      <img src={logo} alt="logo" className="w-full mb-10" />
      <h1 className="text-2xl font-bold text-red-500 text-center mt-10">Coming Soon...</h1>
    </div>

  );
}

export default Error;
