import { useState, useEffect } from "react";
import { TopBar2 } from "../../components/TopBar2";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import SajuGrid from "../../components/SajuGrid";
import { testUsers } from "../../data/user";

// 천간, 지지, 60갑자 등의 상수 정의
const HEAVENLY_STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const EARTHLY_BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const SOLAR_TERMS = [
  [1, 6, 21], [2, 4, 19], [3, 6, 21], [4, 5, 20], [5, 6, 21], [6, 6, 22],
  [7, 7, 23], [8, 8, 23], [9, 8, 23], [10, 8, 24], [11, 7, 22], [12, 7, 22]
];

// 기준일: 1924-02-05
const REFERENCE_DATE = new Date(1924, 1, 5);

// 사주 계산 함수들
const calculateYearPillar = (dateTime) => {
  let year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  
  if (month === 1 || (month === 2 && day < 4)) {
    year--;
  }
  
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return HEAVENLY_STEMS[(stemIndex + 10) % 10] + EARTHLY_BRANCHES[(branchIndex + 12) % 12];
};

const calculateMonthPillar = (dateTime) => {
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  
  const solarTerm = SOLAR_TERMS[month - 1];
  if (day < solarTerm[1]) {
    month = month - 1 === 0 ? 12 : month - 1;
  }
  
  let yearStem = (year - 4) % 10;
  yearStem = yearStem < 0 ? yearStem + 10 : yearStem;
  
  let monthStem = (yearStem * 2 + month) % 10;
  monthStem = monthStem < 0 ? monthStem + 10 : monthStem;
  
  let monthBranch = (month + 1) % 12;
  monthBranch = monthBranch === 0 ? 12 : monthBranch;
  monthBranch = (monthBranch - 1) % 12;
  
  return HEAVENLY_STEMS[monthStem] + EARTHLY_BRANCHES[monthBranch];
};

const calculateDayPillar = (dateTime) => {
  const date = new Date(dateTime);
  const hour = date.getHours();
  
  if (hour >= 23) {
    date.setDate(date.getDate() + 1);
  }
  
  const daysBetween = Math.floor((date - REFERENCE_DATE) / (1000 * 60 * 60 * 24));
  const dayIndex = (daysBetween + 50) % 60;
  
  const stemIndex = dayIndex % 10;
  const branchIndex = dayIndex % 12;
  
  return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex];
};

const getStemIndex = (stem) => {
  return HEAVENLY_STEMS.findIndex(s => s === stem);
};

const calculateHourPillar = (dailyPillar, time) => {
  if (!time) {
    time = new Date();
    time.setHours(0, 0, 0, 0);
  }

  // 태양시 보정 (30분 빼기)
  let minutes = time.getHours() * 60 + time.getMinutes() - 30;
  let hour = Math.floor(minutes / 60);
  minutes = minutes % 60;

  // 자시(子時) 처리
  let branchIndex;
  if (hour === 0 || (hour === 1 && minutes < 59)) {
    branchIndex = 0;
  } else {
    branchIndex = Math.floor((hour + 1) / 2) % 12;
  }

  const dailyStem = dailyPillar.substring(0, 1);
  const dayStemIndex = getStemIndex(dailyStem);
  const hourStemIndex = (dayStemIndex * 2 + branchIndex) % 10;

  return HEAVENLY_STEMS[hourStemIndex] + EARTHLY_BRANCHES[branchIndex];
};

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

function MyPageEditSaju() {
  const [formData, setFormData] = useState({
    name: "",
    birthDay: "",
    birthTime: "",
    birthTimeUnknown: false,
  });

  const [sajuData, setSajuData] = useState(null);

  const [errors, setErrors] = useState({
    name: false,
    birthDay: false,
    birthTime: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = testUsers[0];
        
        setFormData({
          name: userData.name,
          birthDay: userData.birthDay,
          birthTime: userData.birthTimeUnknown ? "00:00" : userData.birthTime,
          birthTimeUnknown: userData.birthTimeUnknown,
        });

        // 초기 사주 계산
        const initialSaju = calculateSaju(userData.birthDay, userData.birthTime);
        setSajuData(initialSaju);
        
      } catch (error) {
        console.error('프로필 데이터 로딩 실패:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
  };

  const handleBirthTimeUnknown = (e) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      birthTimeUnknown: isChecked,
      birthTime: isChecked ? "00:00" : prev.birthTime
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: false,
      birthDay: false,
      birthTime: false,
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = true;
      isValid = false;
    }

    if (!formData.birthDay || formData.birthDay.length !== 10 || 
        (!formData.birthTimeUnknown && (!formData.birthTime || formData.birthTime.length !== 5))) {
      newErrors.birthDay = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateSaju = (birthDay, birthTime) => {
    if (!birthDay) return null;

    const [year, month, day] = birthDay.split('-').map(Number);
    let dateTime = new Date(year, month - 1, day);

    if (birthTime) {
      const [hours, minutes] = birthTime.split(':').map(Number);
      dateTime.setHours(hours, minutes);
    }

    const yearPillar = calculateYearPillar(dateTime);
    const monthPillar = calculateMonthPillar(dateTime);
    const dayPillar = calculateDayPillar(dateTime);
    const hourPillar = birthTime ? calculateHourPillar(dayPillar, dateTime) : null;

    return {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      time: hourPillar
    };
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const saju = calculateSaju(formData.birthDay, formData.birthTime);
      setSajuData(saju);
      console.log("사주 계산 결과:", saju);
      // TODO: API 호출 로직 추가
      console.log("제출된 데이터:", { ...formData, saju });
    }
  };

  return (
    <div className="h-screen relative pt-14 flex flex-col px-5">
      <TopBar2 mainText={"내 사주 수정하기"} />
      <div className="flex-1 p-5">
        <div className="mb-6">
          <h3 className="input-prompt font-semibold text-xl mb-2">이름</h3>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름"
            />
          {errors.name && <ErrorBubble>이름을 입력해주세요</ErrorBubble>}
        </div>
          {sajuData && (
            <div className="mb-6">
              <SajuGrid
                saju={sajuData}
                title={false}
                className="border-t-2 border-gray-100"
              />
            </div>
          )}

        <div className="mb-6">
          <h3 className="input-prompt font-semibold text-xl mb-2">생년월일을 양력으로 입력해주세요.</h3>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              name="birthDay"
              value={formData.birthDay}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d/]/g, "");
                if (value.length > 10) return;
                const numbers = value.replace(/\//g, "");      
                if (numbers.length > 0) {
                  value = numbers.slice(0, 4);
                  if (numbers.length > 4) {
                    value += "-" + numbers.slice(4, 6);
                  }
                  if (numbers.length > 6) {
                    value += "-" + numbers.slice(6);
                  }
                }     
                setFormData(prev => ({
                  ...prev,
                  birthDay: value
                }));
              }}
              placeholder="2025-01-28"
              maxLength="10"
              className="w-2/3"
            />
            <Input
              type="text"
              name="birthTime"
              value={formData.birthTime}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d:]/g, "");
                if (value.length > 5) return;      
                const numbers = value.replace(/:/g, "");
                if (numbers.length > 0) {
                  value = numbers.slice(0, 2);
                  if (numbers.length > 2) {
                    value += ":" + numbers.slice(2);
                  }
                }
                setFormData(prev => ({
                  ...prev,
                  birthTime: value
                }));
              }}
              placeholder="18:00"
              maxLength="5"
              disabled={formData.birthTimeUnknown}
              className="w-1/3"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="birthTimeUnknown"
              checked={formData.birthTimeUnknown}
              onChange={handleBirthTimeUnknown}
              style={{ cursor: "pointer" }}
            />
            <label 
              htmlFor="birthTimeUnknown"
              style={{ cursor: "pointer", fontSize: "14px" }}
              className="text-gray-500"
            >
              태어난 시간을 모릅니다
            </label>
          </div>
          {errors.birthDay && <ErrorBubble>태어난 시간을 입력해주세요</ErrorBubble>}
        </div>

        <MainButton 
          onClick={handleSubmit}
          className="w-full py-3"
        >
          수정하기
        </MainButton>
      </div>
    </div>
  );
}

export default MyPageEditSaju;
