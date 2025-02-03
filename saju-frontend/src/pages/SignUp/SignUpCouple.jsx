import { useNavigate } from 'react-router-dom';
import SelectionGrid from '../../components/SelectionGrid';

function SignUpCouple() {
  const navigate = useNavigate();

  return (
    <div className="signup-preference flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-8">커플 등록</h2>
    </div>
  );
}

export default SignUpCouple;