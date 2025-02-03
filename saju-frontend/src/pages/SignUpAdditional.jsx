import { useNavigate } from 'react-router-dom';
import SelectionGrid from '../components/SelectionGrid';

function SignUpAdditional() {
  const navigate = useNavigate();

  return (
    <div className="welcome flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-8">현재 상태는?</h2>
      <SelectionGrid 
        cols = {2}
        options={['솔로', '커플']}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}

export default SignUpAdditional;