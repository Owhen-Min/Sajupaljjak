import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error flex flex-col items-center pt-20">
      <div className="flex flex-col items-center my-10">
        <img src={logo} alt="logo" className="w-1/2 mb-10" />
        <h1 className="text-5xl font-gapyeong"><span className="text-black">사주팔</span><span className="text-red-500">짝</span></h1>
      </div>
      <h1 className="text-2xl font-bold text-red-500 text-center mt-20">Coming Soon...</h1>
    </div>

  );
}

export default Error;
