import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopBar2 from '../components/TopBar2';
import SelectionGrid from '../components/SelectionGrid';
import Dropdown from '../components/Dropdown';
import { provinces } from '../data/provinceCode';
import RangeSlider from '../components/RangeSlider';

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

function Preference() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    religion: '',
    smoking: '',
    heightRange: [140, 220],
    cityCode: '',
    dongCode: '',
    ageRange: [20, 40],
  });
  const [errors, setErrors] = useState({
    religion: false,
    smoking: false,
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

  return (
    <div className="preference flex flex-col relative justify-center min-h-screen">
      <TopBar2 mainText="내 선호대상 입력" />
      <div className="preference-content p-5">
        <h3 className="input-prompt mb-4">선호하는 나이 범위를 선택해주세요</h3>
        <div className="input-group mb-8">
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
          {errors.ageRange && <ErrorBubble>나이 범위를 선택해주세요</ErrorBubble>}
        </div>
        
        <h3 className="input-prompt mb-4">선호하는 종교를 선택해주세요</h3>
        <div className="input-group mb-8">
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

        <h3 className="input-prompt mb-4">선호하는 흡연 여부를 선택해주세요</h3>
        <div className="input-group mb-8">
          <SelectionGrid
            cols={3}
            options={['흡연', '비흡연', '금연중']}
            onSelect={(selected) => handleSelectionChange('smoking', selected)}
            selected={formData.smoking ? [['흡연', '비흡연', '금연중'].indexOf(formData.smoking)] : []}
          />
          {errors.smoking && <ErrorBubble>흡연 여부를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-4">선호하는 키 범위를 선택해주세요</h3>
        <div className="input-group mb-8">
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
          {errors.height && <ErrorBubble>키 범위를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-4">선호하는 지역을 선택해주세요</h3>
        <div className="input-group mb-8">
          <div className="flex flex-row gap-2.5 w-full">
            <Dropdown
              name="cityCode"
              value={Object.keys(provinces).find(key => provinces[key].code === formData.cityCode) || ""}
              onChange={(e) => {
                setFormData(prev => ({ 
                  ...prev, 
                  cityCode: provinces[e.target.value]?.code || '',
                  dongCode: '' 
                }));
              }}
              placeholder="시/도 선택"
              options={Object.keys(provinces).map(province => ({
                value: province,
                label: province
              }))}
              className="flex-1"
            />

            {formData.cityCode && (
              <Dropdown
                name="dongCode"
                value={(() => {
                  const selectedSi = Object.keys(provinces).find(
                    key => provinces[key].code === formData.cityCode
                  );
                  return Object.keys(provinces[selectedSi]?.sigungu || {}).find(
                    key => provinces[selectedSi]?.sigungu[key] === formData.dongCode
                  ) || "";
                })()}
                onChange={(e) => {
                  const selectedSi = Object.keys(provinces).find(
                    key => provinces[key].code === formData.cityCode
                  );
                  const selectedDongCode = provinces[selectedSi]?.sigungu[e.target.value];
                  setFormData(prev => ({ 
                    ...prev, 
                    dongCode: selectedDongCode
                  }));
                }}
                placeholder="구/군 선택"
                options={Object.keys(provinces[Object.keys(provinces).find(
                  key => provinces[key].code === formData.cityCode
                )]?.sigungu || {}).map(district => ({
                  value: district,
                  label: district
                }))}
                className="flex-1"
              />
            )}
          </div>
          {errors.location && <ErrorBubble>지역을 모두 선택해주세요</ErrorBubble>}
        </div>

      </div>
    </div>
  );
}

export default Preference;