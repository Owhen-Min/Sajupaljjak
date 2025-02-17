import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopBar2 from '../../components/TopBar2';
import SelectionGrid from '../../components/SelectionGrid';
import Dropdown from '../../components/Dropdown';
import MainButton from '../../components/MainButton';
import { provinces } from '../../data/provinceCode';
import RangeSlider from '../../components/RangeSlider';
import { useGet, usePost } from '../../hooks/useApi';
import { max, min } from '@tensorflow/tfjs';


function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

function Preference() {
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   smoking: "",
  //   drinking: "",
  //   religion: [],
  //   minHeight: 140,
  //   maxHeight: 220,
  //   minAge: 20,
  //   maxAge: 40,
  //   cityCode: [],
  // });
// 선호 정보 받아서 바꿈꿈
  // const { data, isPending, error } = useGet("/api/match/filter");
  // useEffect(() => {
  //   if(data && data.smoking && data.drinking) {
  //     setFormData(data);
  //   }
  // }

  const mutation = usePut("/api/match/filter");

  const [formData, setFormData] = useState({
    smoking: '',
    drinking: '',
    religion: [],
    heightRange: [140, 220],
    cityCode: [],
    ageRange: [20, 40],
  });
  const [errors, setErrors] = useState({
    religion: false,
    smoking: false,
    drinking: false,
    height: false,
    location: false,
    ageRange: false,
  });

  const handleSelectionChange = (field, selected) => {
    setFormData(prev => ({
      ...prev,
      [field]: selected
    }));
  };

  const validateForm = () => {
    const newErrors = {
      religion: formData.religion.length === 0,
      smoking: formData.smoking === '',
      drinking: formData.drinking === '',
      location: formData.cityCode.length === 0,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // TODO: API 호출 로직 추가
    console.log('제출된 데이터:', formData);
    
    // 성공 시 다음 페이지로 이동
    // navigate('/next-page');
  };

  return (
    <div className="preference flex flex-col relative justify-center min-h-screen">
      <TopBar2 mainText="내 선호 정보보 입력" />
      <div className="preference-content p-5">
        <h3 className="input-prompt mb-2">선호하는 나이 범위를 선택해주세요</h3>
        <div className="input-group mb-6">
          <div className="flex justify-between mt-2 text-md text-gray-600">
            <span>{formData.ageRange[0]}세</span>
            <span>{formData.ageRange[1]}세</span>
          </div>
          <div className="relative">
            <RangeSlider 
              min={20} 
              max={40}
              value={formData.ageRange}
              keyboard={true}
              onChange={(values) => {
                handleSelectionChange('ageRange', values);
              }}
            />
          </div>
        </div>
        
        <h3 className="input-prompt mb-2">선호하는 종교를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={3}
            options={['무교', '개신교', '불교', '천주교', '기타']}
            onSelect={(selected) => handleSelectionChange('religion', selected)}
            selected={formData.religion ? [['무교', '개신교', '불교', '천주교', '기타'].indexOf(formData.religion)] : []}
            showSelectAll={true}
            multiSelect={true}
          />
          {errors.religion && <ErrorBubble>종교를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-2">선호하는 음주 여부를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={2}
            options={['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상']}
            onSelect={(selected) => handleSelectionChange('drinking', selected)}
            selected={formData.drinking ? [['주 1~2회', '주 3~4회', '주 5~6회', '주 7회 이상'].indexOf(formData.drinking)] : []}
          />

          {errors.drinking && <ErrorBubble>음주 여부를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-2">선호하는 흡연 여부를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={3}
            options={['흡연', '비흡연', '금연중']}
            onSelect={(selected) => handleSelectionChange('smoking', selected)}
            selected={formData.smoking ? [['흡연', '비흡연', '금연중'].indexOf(formData.smoking)] : []}
          />
          {errors.smoking && <ErrorBubble>흡연 여부를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-2">선호하는 키 범위를 선택해주세요</h3>
        <div className="input-group mb-6">
          <div className="relative">
            <RangeSlider 
              min={140} 
              max={220}
              value={formData.heightRange}
              keyboard={true}
              onChange={(values) => handleSelectionChange('heightRange', values)}
            />
            <div className="flex justify-between mt-2 text-md text-gray-600">
              <span>{formData.heightRange[0]}cm</span>
              <span>{formData.heightRange[1]}cm</span>
            </div>
          </div>
        </div>

        <h3 className="input-prompt mb-2">선호하는 지역을 선택해주세요</h3>
        <div className="input-group mb-6 text-sm">
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.cityCode.map(code => {
              const cityName = Object.keys(provinces).find(key => 
                provinces[key].code === code
              );
              return (
                <button
                key={code}
                className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {cityName}
                  <span
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        cityCode: prev.cityCode.filter(c => c !== code)
                      }));
                    }}
                  >
                    ×
                  </span>
                </button>
              );
              
            })}
          </div>
            <Dropdown
              className={"mt-3"}
              options={Object.keys(provinces).map(cityName => ({
                value: provinces[cityName].code,
                label: cityName
              }))}
              value=""
              placeholder="도시를 선택하세요"
              onChange={(e) => {
                const selectedCode = e.target.value;
                if (!formData.cityCode.includes(selectedCode)) {
                  setFormData(prev => ({
                    ...prev,
                    cityCode: [...prev.cityCode, selectedCode]
                  }));
                }
              }}
            />
          {errors.location && <ErrorBubble>지역을 선택해주세요</ErrorBubble>}
        </div>
        <MainButton
        children={'제출'}
        onClick={handleSubmit}
        className={"w-full py-3"}
        />
      </div>
    </div>
  );
}

export default Preference;