import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import SelectionGrid from '../../components/SelectionGrid';

function SignUpPreference() {
  const navigate = useNavigate();

  return (
    <div className="signup-preference flex flex-col relative justify-center min-h-screen">
      <div className="flex items-center relative w-full">
        <BackButton />
        <h1 className="w-full text-center text-base font-semibold">
          내 선호대상 입력
        </h1>
      </div>
    </div>
  );
}

export default SignUpPreference;