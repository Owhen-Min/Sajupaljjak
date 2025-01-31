import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectionGrid from '../components/SelectionGrid';
import { TailwindInput, TailwindButton } from '../components/TailwindElements';
import { provinces } from '../data/provinceCode';
import '../styles/Signup.css';

function Header({ step, children }) {
  const getProgressWidth = () => {
    if (step < 4) return 'w-1/3';
    if (step < 9) return 'w-2/3';
    return 'w-full';
  };

  return (
    <div className="flex flex-col p-5 border-b border-gray-200">
      <div className="flex items-center relative mb-2.5">
        {children}
      </div>
      <div className="w-full h-0.5 bg-gray-200 relative">
        <div className={`absolute h-full bg-red-500 transition-all duration-300 ${getProgressWidth()}`} />
      </div>
    </div>
  );
}

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

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
    birthtimeUnknown: false,
    religion: '',
    smoking: '',
    drinking: '',
    height: '170',
    si: '',
    gun: '',
    nickname: '',
    introduction: '',
    profileImage: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    birthday: false,
    birthtime: false,
    religion: false,
    smoking: false,
    drinking: false,
    height: false,
    location: false
  });

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
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
        
    if (step < 4) {
      const updatedFormData = { ...formData, [name]: inputValue };
      if (step === 1 && updatedFormData.name) {
        setStep(2);
      } else if (step === 3 && (
        (updatedFormData.birthday && updatedFormData.birthtime) || 
        (updatedFormData.birthday && updatedFormData.birthtimeUnknown)
      )) {
        setStep(4);
      }
    }
  };

  const handleSelectionChange = (field, selected) => {
    console.log('handleSelectionChange 호출됨:', { field, selected, currentStep: step });
    
    setFormData(prev => {
      const newFormData = { ...prev, [field]: selected };
      
      if (step < 8) {
        if (step === 2 && field === 'gender') {
          setTimeout(() => {
            setStep(3);
            setMaxStep(Math.max(maxStep, 4));
          }, 100);
        } else if (step === 4 && field === 'religion') {
          setTimeout(() => {
            setStep(5);
            setMaxStep(Math.max(maxStep, 5));
          }, 100);
        } else if (step === 5 && field === 'smoking') {
          setTimeout(() => {
            setStep(6);
            setMaxStep(Math.max(maxStep, 6));
          }, 100);
        } else if (step === 6 && field === 'drinking') {
          setTimeout(() => {
            setStep(7);
            setMaxStep(Math.max(maxStep, 7));
          }, 100);
        } else if (step === 7 && field === 'height') {
          setTimeout(() => {
            setStep(8);
            setMaxStep(Math.max(maxStep, 9));
          }, 100);
        }
      }
      
      return newFormData;
    });
  };

  const validateStep = (currentStep) => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 3) {
      if (!formData.name) {
        newErrors.name = true;
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = true;
        isValid = false;
      }
      if (!formData.birthday || (!formData.birthtimeUnknown && !formData.birthtime)) {
        newErrors.birthday = true;
        isValid = false;
      }
    } else if (currentStep === 8) {
      // 내 정보 입력 단계 검증
      if (!formData.religion) {
        newErrors.religion = true;
        isValid = false;
      }
      if (!formData.smoking) {
        newErrors.smoking = true;
        isValid = false;
      }
      if (!formData.drinking) {
        newErrors.drinking = true;
        isValid = false;
      }
      if (!formData.height) {
        newErrors.height = true;
        isValid = false;
      }
      if (!formData.si || !formData.gun) {
        newErrors.location = true;
        isValid = false;
      }
    } else if (currentStep === 11) {
      if (!formData.nickname) {
        newErrors.nickname = true;
        isValid = false;
      }
      if (!formData.introduction) {
        newErrors.introduction = true;
        isValid = false;
      }
      if (!formData.profileImage) {
        newErrors.profileImage = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const renderStep = () => {
    return (
      <div className="signup-step">
        {4 > step && step >= 1 && (
          <>
            <h3 className="input-prompt">이름을 입력해 주세요</h3>
            <div className="input-group">
              <TailwindInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름"
              />
              {errors.name && (
                <ErrorBubble>
                  이름을 입력해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}
                
        {4 > step && step >= 2 && (
          <>
            <h3 className="input-prompt">성별을 입력해주세요</h3>
            <div className="input-group">
              <SelectionGrid
                rows={1}
                cols={2}
                options={['남자', '여자']}
                onSelect={(selected) => handleSelectionChange('gender', selected)}
                selected={formData.gender ? [['남자', '여자'].indexOf(formData.gender)] : []}
              />
              {errors.gender && (
                <ErrorBubble>
                  성별을 선택해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}
            
        {4 > step && step >= 3 && (
          <>
            <h3 className="input-prompt">태어난 시간을 입력해주세요.<br/>양력으로 입력해주세요.</h3>
              <div className="flex items-center gap-2 mt-2">
                <TailwindInput
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
                <TailwindInput
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
                  disabled={formData.birthtimeUnknown}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="birthtimeUnknown"
                  checked={formData.birthtimeUnknown}
                  onChange={handleBirthTimeUnknown}
                  style={{ cursor: 'pointer' }}
                />
                <label 
                  htmlFor="birthtimeUnknown"
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                >
                  태어난 시간을 모릅니다
                </label>
              </div>
              {errors.birthday && !formData.birthtimeUnknown && (
                <ErrorBubble>
                  태어난 시간을 입력해주세요
                </ErrorBubble>
              )}
            </>
          )}
            
        {9 > step && step >= 4 && (
          <>
            <h3 className="input-prompt">종교를 선택해주세요</h3>
            <div className="input-group">
              <SelectionGrid
                rows={2}
                cols={3}
                options={['무교', '개신교', '불교', '천주교', '기타']}
                onSelect={(selected) => handleSelectionChange('religion', selected)}
                selected={formData.religion ? [['무교', '개신교', '불교', '천주교', '기타'].indexOf(formData.religion)] : []}
              />
              {errors.religion && (
                <ErrorBubble>
                  종교를 선택해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}

        {9 > step && step >= 5 && (
          <>
            <h3 className="input-prompt">흡연 여부를 선택해주세요</h3>
            <div className="input-group">
              <SelectionGrid
                rows={1}
                cols={3}
                options={['흡연', '비흡연', '금연중']}
                onSelect={(selected) => handleSelectionChange('smoking', selected)}
                selected={formData.smoking ? [['흡연', '비흡연', '금연중'].indexOf(formData.smoking)] : []}
              />
              {errors.smoking && (
                <ErrorBubble>
                  흡연 여부를 선택해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}

        {9 > step && step >= 6 && (
          <>
            <h3 className="input-prompt">음주 여부를 선택해주세요</h3>
            <div className="input-group">
              <SelectionGrid
                rows={2}
                cols={2}
                options={['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상']}
                onSelect={(selected) => handleSelectionChange('drinking', selected)}
                selected={formData.drinking ? [['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상'].indexOf(formData.drinking)] : []}
                multiSelect={false}
              />
              {errors.drinking && (
                <ErrorBubble>
                  음주 여부를 선택해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}

        {9 > step && step >= 7 && (
          <>
            <h3 className="input-prompt">키를 입력해주세요</h3>
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
                  }}
                  className="w-30 h-10 text-center text-base border border-gray-300 rounded-md appearance-none cursor-pointer bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 9L0 0h12z' fill='%23FF0000'/%3E%3C/svg%3E')] bg-no-repeat bg-right-10-center pr-8"
                  onClick={(e) => {
                    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                      e.preventDefault();
                      const input = document.createElement('input');
                      input.type = 'number';
                      input.min = '140';
                      input.max = '220';
                      input.value = formData.height || '170';
                      input.style.position = 'absolute';
                      input.style.opacity = '0';
                      
                      input.addEventListener('change', (event) => {
                        const value = event.target.value;
                        if (140 <= value && value <= 220) {
                          setFormData(prev => ({ ...prev, height: value }));
                        }
                        document.body.removeChild(input);
                      });

                      document.body.appendChild(input);
                      input.focus();
                      input.click();
                    }
                    setStep(8);
                    setMaxStep(Math.max(maxStep, 9));
                  }}
                >
                  {Array.from({ length: 81 }, (_, i) => i + 140).map(height => (
                    <option key={height} value={height}>
                      {height}cm
                    </option>
                  ))}
                </select>
              </div>
              {errors.height && (
                <ErrorBubble>
                  키를 입력해주세요
                </ErrorBubble>
              )}
            </div>
          </>
        )}

        {9 > step && step >= 8 && (
          <>
            <h3 className="input-prompt">거주지를 선택해주세요</h3>
            <div className="input-group">
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2.5 w-full">
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
                    className="flex-1 h-10 px-2 border border-gray-300 rounded-md text-base"
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
                      className="flex-1 h-10 px-2 border border-gray-300 rounded-md text-base"
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
                {errors.location && (
                  <ErrorBubble>
                    거주지를 모두 선택해주세요
                  </ErrorBubble>
                )}
              </div>
            </div>
          </>
        )}
        {11 > step && step >= 9 && (
          <>
            <h3 className="input-prompt">닉네임을 입력해주세요</h3>
            <div className="input-group">
              <div className="flex flex-col w-full">
                <TailwindInput
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임"
                />
                {errors.nickname && (
                  <ErrorBubble>
                    닉네임을 입력해주세요
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
        console.log('제출된 데이터:', formData);
    };

    const handleNextStep = () => {
      if (step < 9) {
        if (!validateStep(step)) {
          return;
        }
        
        let nextStep;
        if (step === 3) {
          nextStep = Math.min(8, maxStep);
        } else if (step === 8) {
          nextStep = 9;
        }
        
        setStep(nextStep);
        setMaxStep(Math.max(maxStep, nextStep));
      }
    };

    const handleBirthTimeUnknown = (e) => {
      const isChecked = e.target.checked;
      setFormData(prev => ({
        ...prev,
        birthtimeUnknown: isChecked,
        birthtime: isChecked ? '' : prev.birthtime
      }));
    };

    return (
      <div className="signup">
        <Header step={step}>
          <div className="flex items-center relative w-full">
            {step > 3 && (
              <button 
                className="back-button absolute left-0" 
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
            <h1 className="w-full text-center text-base font-semibold">
              {step >= 9 ? '내 프로필 입력' : step >= 4 ? '내 정보 입력' : '사주 정보 입력'}
            </h1>
          </div>
        </Header>
        {renderStep()}
        <div className="button-group">
          {(step === 3 || step === 8) && (
            <TailwindButton 
              onClick={handleNextStep}
              disabled={step >= maxStep}
            >
              다음
            </TailwindButton>
          )}
          {step === 11 && (
            <TailwindButton onClick={handleSubmit}>
              확인
            </TailwindButton>
          )}
        </div>
      </div>
    );
}

export default SignUpPage;