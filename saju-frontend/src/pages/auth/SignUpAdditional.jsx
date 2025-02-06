import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SelectionGrid from '../../components/SelectionGrid';
import MainButton from '../../components/MainButton';

function SignUpAdditional() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  return (
    <div className="signup-additional flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-8">현재 상태는?</h2>
      <div className="w-1/2 max-w-md">
        <SelectionGrid 
          cols={2}
          options={['솔로', '커플']}
        selected={[]}
        onSelect={(value) => {
          setSelected(value);
        }}
        />
      </div>
      <MainButton 
        onClick={() => {
          if (selected === '솔로') {navigate('/auth/preference')}
          else if (selected === '커플') {navigate('/auth/coupleinvitation')}
        }}
        half={true}>
        다음
        </MainButton>
    </div>
  );
}

export default SignUpAdditional;