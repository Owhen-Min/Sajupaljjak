import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectionGrid from '../components/SelectionGrid';
import styled from 'styled-components';
import { StyledInput, StyledButton } from '../components/StyledElements';
import { provinces } from '../data/provinceCode';

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #eee;
  
  .header-content {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
  }

  h1 {
    flex: 1;
    text-align: center;
    font-size: 18px;
    margin: 0;
  }
  
  .back-button {
    position: absolute;
    left: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: #FF0000;
  }

  .progress-bar {
    width: 100%;
    height: 2px;
    background-color: #eee;
    position: relative;
  }

  .progress-fill {
    position: absolute;
    height: 100%;
    background-color: #FF0000;
    width: ${props => {
      if (props.step < 4) return '33.33%';
      if (props.step < 9) return '66.66%';
      return '100%';
    }};
    transition: width 0.3s ease;
  }
`;

const ErrorBubble = styled.div`
  color: #FF0000;
  background-color: #FFE6E6;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 14px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 20px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #FFE6E6;
  }
`;

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    gender: '',
    birthday: '',
    birthtime: '',
    religion: '',
    smoking: '',
    drinking: '',
    height: '170',
    si: '',
    gun: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [options, setOptions] = useState(['무교', '개신교', '불교', '천주교', '기타']);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
        
    if (!emailParam) {
      navigate('/', { replace: true });
      return;
  }
        
  setFormData(prev => ({ ...prev, email: emailParam }));
  }, [navigate, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
        
    // 자동으로 다음 단계로 이동하는 로직 추가
    if (step < 4) {
      const updatedFormData = { ...formData, [name]: value };
      if (step === 1 && updatedFormData.name) {
        setStep(2);
      } else if (step === 3 && updatedFormData.birthday && updatedFormData.birthtime) {
        setStep(4);
      }
    }
  };

  const handleSelectionChange = (field, selected) => {
    console.log('handleSelectionChange 호출됨:', { field, selected, currentStep: step });
    
    setFormData(prev => {
      const newFormData = { ...prev, [field]: selected };
      console.log('새로운 formData:', newFormData);
      
      if (step < 8) {
        console.log('현재 step:', step);
        if (step === 2 && field === 'gender') {
          console.log('성별 선택 후 step 3으로 이동 시도');
          setTimeout(() => {
            setStep(3);
            setMaxStep(Math.max(maxStep, 4));
          }, 100);
        } else if (step === 4 && field === 'religion') {
          console.log('종교 선택 후 step 5로 이동 시도');
          setTimeout(() => {
            setStep(5);
            setMaxStep(Math.max(maxStep, 5));
          }, 100);
        } else if (step === 5 && field === 'smoking') {
          console.log('흡연 선택 후 step 6으로 이동 시도');
          setTimeout(() => {
            setStep(6);
            setMaxStep(Math.max(maxStep, 6));
          }, 100);
        } else if (step === 6 && field === 'drinking') {
          console.log('음주 선택 후 step 7로 이동 시도');
          setTimeout(() => {
            setStep(7);
            setMaxStep(Math.max(maxStep, 7));
          }, 100);
        } else if (step === 7 && field === 'height') {
          console.log('키 선택 후 step 8로 이동 시도');
          setTimeout(() => {
            setStep(8);
            setMaxStep(Math.max(maxStep, 9));
          }, 100);
        }
      }
      
      return newFormData;
    });
  };

  const renderStep = () => {
    return (
      <div className="signup-step">
        {4 > step && step >= 1 && (
          <>
            <h2>이름을 입력해 주세요</h2>
            <div className="input-group">
              <StyledInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름"
              />
            </div>
          </>
        )}
                
        {4 > step && step >= 2 && (
          <>
            <h2>성별을 입력해주세요</h2>
            <div className="input-group">
              <SelectionGrid
                rows={1}
                cols={2}
                options={['남자', '여자']}
                onSelect={(selected) => handleSelectionChange('gender', selected)}
                selected={formData.gender ? [['남자', '여자'].indexOf(formData.gender)] : []}
              />
            </div>
          </>
        )}
            
        {4 > step && step >= 3 && (
          <>
            <h2>태어난 시간을 입력해주세요.<br/>양력으로 입력해주세요.</h2>
              <InputGroup>
                <StyledInput
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d/]/g, '');
                    if (value.length > 10) return;
                    const numbers = value.replace(/\//g, '');      
                    if (numbers.length > 0) {
                      value = numbers.slice(0, 4);
                      if (numbers.length > 4) {
                        value += '/' + numbers.slice(4, 6);
                      }
                      if (numbers.length > 6) {
                        value += '/' + numbers.slice(6);
                      }
                    }     
                    setFormData(prev => ({
                        ...prev,
                        birthday: value
                      }));
                    }}
                    placeholder="2025/01/28"
                    maxLength="10"
                    style={{ flex: 2 }}
                  />
                <StyledInput
                  type="text"
                  name="birthtime"
                  value={formData.birthtime}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d:]/g, '');
                    if (value.length > 5) return;      
                    const numbers = value.replace(/:/g, '');
                    if (numbers.length > 0) {
                      value = numbers.slice(0, 2);
                      if (numbers.length > 2) {
                        value += ':' + numbers.slice(2);
                      }
                    }
                        
                  setFormData(prev => ({
                    ...prev,
                    birthtime: value
                    }));
                  }}
                  placeholder="18:00"
                  maxLength="5"
                  style={{ flex: 1 }}
                />
              </InputGroup>
            </>
          )}
            
        {9 > step && step >= 4 && (
          <>
            <h2>종교를 선택해주세요</h2>
            <div className="input-group">
              <SelectionGrid
                rows={3}
                cols={2}
                options={['무교', '개신교', '불교', '천주교', '기타']}
                onSelect={(selected) => handleSelectionChange('religion', selected)}
                selected={formData.religion ? [['무교', '개신교', '불교', '천주교', '기타'].indexOf(formData.religion)] : []}
              />
            </div>
          </>
        )}

        {9 > step && step >= 5 && (
          <>
            <h2>흡연 여부를 선택해주세요</h2>
            <div className="input-group">
              <SelectionGrid
                rows={1}
                cols={3}
                options={['흡연', '비흡연', '금연중']}
                onSelect={(selected) => handleSelectionChange('smoking', selected)}
                selected={formData.smoking ? [['흡연', '비흡연', '금연중'].indexOf(formData.smoking)] : []}
              />
            </div>
          </>
        )}

        {9 > step && step >= 6 && (
          <>
            <h2>음주 여부를 선택해주세요</h2>
            <div className="input-group">
              <SelectionGrid
                rows={1}
                cols={4}
                options={['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상']}
                onSelect={(selected) => handleSelectionChange('drinking', selected)}
                selected={formData.drinking ? [['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상'].indexOf(formData.drinking)] : []}
              />
            </div>
          </>
        )}

        {9 > step && step >= 7 && (
          <>
            <h2>키를 입력해주세요</h2>
            <div className="input-group" style={{ position: 'relative' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'start',
                width: '100%'
              }}>
                <select
                  name="height"
                  value={formData.height || "170"}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setFormData(prev => ({ ...prev, height: selected }));
                    // 키 선택 후 자동으로 다음 단계로 이동
                    setTimeout(() => {
                      setStep(8);
                      setMaxStep(Math.max(maxStep, 9));
                    }, 100);
                  }}
                  style={{
                    width: '120px',
                    height: '40px',
                    textAlign: 'center',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 9L0 0h12z' fill='%23FF0000'/%3E%3C/svg%3E") no-repeat right 10px center`,
                    backgroundColor: 'white',
                    paddingRight: '30px',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    // 모바일 환경에서는 네이티브 피커 사용
                    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                      e.preventDefault();
                      const input = document.createElement('input');
                      input.type = 'number';
                      input.min = '130';
                      input.max = '220';
                      input.value = formData.height || '170';
                      input.style.position = 'absolute';
                      input.style.opacity = '0';
                      
                      input.addEventListener('change', (event) => {
                        const value = event.target.value;
                        if (130 <= value && value <= 220) {
                          setFormData(prev => ({ ...prev, height: value }));
                        }
                        document.body.removeChild(input);
                      });

                      document.body.appendChild(input);
                      input.focus();
                      input.click();
                    }
                  }}
                >
                  {Array.from({ length: 91 }, (_, i) => i + 130).map(height => (
                    <option key={height} value={height}>
                      {height}cm
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {9 > step && step >= 8 && (
          <>
            <h2>거주지를 선택해주세요</h2>
            <div className="input-group">
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: '10px',
                  width: '100%' 
                }}>
                  <select
                    name="si"
                    value={Object.keys(provinces).find(key => provinces[key].code === formData.si) || ""}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        si: provinces[e.target.value]?.code || '',
                        gun: '' 
                      }));
                    }}
                    style={{
                      flex: 1,
                      height: '40px',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">시/도 선택</option>
                    {Object.keys(provinces).map(province => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>

                  {formData.si && (
                    <select
                      name="gun"
                      value={(() => {
                        const selectedSi = Object.keys(provinces).find(
                          key => provinces[key].code === formData.si
                        );
                        return Object.keys(provinces[selectedSi]?.sigungu || {}).find(
                          key => provinces[selectedSi]?.sigungu[key] === formData.gun
                        ) || "";
                      })()}
                      onChange={(e) => {
                        const selectedSi = Object.keys(provinces).find(
                          key => provinces[key].code === formData.si
                        );
                        const selectedGunCode = provinces[selectedSi]?.sigungu[e.target.value];
                        setFormData(prev => ({ 
                          ...prev, 
                          gun: selectedGunCode
                        }));
                      }}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">구/군 선택</option>
                      {Object.keys(provinces[Object.keys(provinces).find(
                        key => provinces[key].code === formData.si
                      )].sigungu).map(district => {
                        const selectedSi = Object.keys(provinces).find(
                          key => provinces[key].code === formData.si
                        );
                        const districtName = district.replace(selectedSi, '').replace(/^\s+/, '');
                        return (
                          <option key={district} value={district}>
                            {districtName}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                {locationError && (
                  <ErrorBubble>
                    거주지를 모두 선택해주세요
                  </ErrorBubble>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

    const handleSubmit = () => {
        // 여기에 제출 로직 구현
        console.log('제출된 데이터:', formData);
    };

    // 다음 단계로 이동하는 함수 추가
    const handleNextStep = () => {
      if (step < 9) {
        if (step === 8 && (!formData.si || !formData.gun)) {
          setLocationError(true);
          return;
        }
        
        setLocationError(false);
        const nextStep = step + 1;
        setStep(nextStep);
        setMaxStep(Math.max(maxStep, nextStep));
      }
    };

    return (
      <div className="signup">
        <StyledHeader step={step}>
          <div className="header-content">
            {step > 3 && (
              <button 
                className="back-button" 
                onClick={() => {
                  if (step >= 9) {
                    setStep(8);
                  } else if (step >= 4) {
                    setStep(3);
                  }
                }}
              >
                이전
              </button>
            )}
            <h1>{step >= 4 ? '내 정보 입력' : '사주 정보 입력'}</h1>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </StyledHeader>
        {renderStep()}
        <div className="button-group">
          {step < 9 && (
            <StyledButton 
              onClick={handleNextStep}
              disabled={step >= maxStep}
            >
              다음
            </StyledButton>
          )}
          {step === 9 && (
            <StyledButton onClick={handleSubmit}>
              확인
            </StyledButton>
          )}
        </div>
      </div>
    );
}

export default SignUpPage;