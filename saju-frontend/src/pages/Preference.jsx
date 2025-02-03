import { useNavigate } from 'react-router-dom';
import TopBar2 from '../components/TopBar2';

function Preference() {
  const navigate = useNavigate();

  return (
    <div className="signup-preference flex flex-col relative justify-center min-h-screen">
      <TopBar2 mainText="내 선호대상 입력" />
    </div>
  );
}

export default Preference;