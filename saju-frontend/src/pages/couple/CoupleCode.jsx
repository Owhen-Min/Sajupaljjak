import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/TopBar2';
import MainButton from '../../components/MainButton';
import Input from '../../components/Input';
import { useGet, usePost } from '../../hooks/useApi';

function CoupleCode() {
  const navigate = useNavigate();
  const [coupleCode, setCoupleCode] = useState({
    code: '',
    expiresAt: null,
  });

  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const { data, isLoading, error } = useGet('/api/inviting');
  const { mutate: createCoupleCode } = usePost('/api/inviting');
  const { refetch: checkConfirm } = useGet('/api/inviting/confirm');
  

  useEffect(() => {
    const loadCoupleCode = async () => {
      // 로컬 스토리지에서 커플 코드 정보 확인
      const savedCode = localStorage.getItem('coupleCode');
      const savedExpiresAt = localStorage.getItem('codeExpiresAt');

      if (savedCode && savedExpiresAt) {
        // 만료 시간이 지나지 않았다면 저장된 코드 사용
        if (new Date(savedExpiresAt) > new Date()) {
          setCoupleCode({
            code: savedCode,
            expiresAt: savedExpiresAt,
          });
          return;
        } else {
          // 만료된 코드는 삭제
          localStorage.removeItem('coupleCode');
          localStorage.removeItem('codeExpiresAt');
        }
      }

      try {
        const code = data.invitingCode;
        // ttl이 초 단위로 오므로, 현재 시간에 ttl을 더해서 만료 시간 계산
        const expiresAt = new Date(Date.now() + data.ttl * 1000).toISOString();
        
        // 로컬 스토리지에 저장
        localStorage.setItem('coupleCode', code);
        localStorage.setItem('codeExpiresAt', expiresAt);
        
        setCoupleCode({
          code: code,
          expiresAt: expiresAt,
        });
      } catch (error) {
        console.error('커플 코드 발급 실패:', error);
      }
    };

    loadCoupleCode();
  }, [data]); 

  // 남은 시간을 표시하기 위한 상태
  const [remainingTime, setRemainingTime] = useState('');

  // 남은 시간 계산 및 업데이트
  useEffect(() => {
    if (!coupleCode.expiresAt) return;

    const updateRemainingTime = () => {
      const now = new Date();
      const expires = new Date(coupleCode.expiresAt);
      const diff = expires - now;

      if (diff <= 0) {
        setRemainingTime('00:00:00');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setRemainingTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [coupleCode.expiresAt]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(coupleCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 복사 상태 초기화
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  // 시작하기 버튼 핸들러
  const handleStartMatching = async () => {
    if (!inputCode.trim()) {
      alert('커플 코드를 입력해주세요.');
      return;
    }

    if (inputCode === coupleCode.code) {
      alert('본인 외의 코드를 입력해주세요.');
      return;
    }

    if (!selectedDate) {
      alert('만나기 시작한 날을 선택해주세요.');
      return;
    }

    try {
      console.log(inputCode, selectedDate);
      createCoupleCode({
        invitingCode: inputCode,
        startDate: selectedDate.toISOString().split('T')[0]
      });
      navigate('/couple');
    } catch (error) {
      console.error('매칭 시도 실패:', error);
      alert('매칭 시도 중 오류가 발생했습니다.');
    }
  };

  // 상대방이 입력했습니다 버튼 핸들러
  const handleMatchComplete = async () => {
    try {
      const response = await checkConfirm();
      if (response.data.status === 200) {
        navigate('/couple');
      } else if (response.data.status === 202) {
        alert("상대가 아직 코드를 입력하지 않았습니다.");
      }
    } catch (error) {
      console.error('매칭 확인 중 오류 발생:', error);
    }
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    
    if (!newValue || dateRegex.test(newValue)) {
      // 유효한 날짜이거나 빈 값인 경우에만 상태 업데이트
      setSelectedDate(newValue);
    }
  };

  return (
    <div className="couple-invitation flex flex-col relative justify-center min-h-screen bg-gray-50 pb-3">
      <TopBar2 mainText={'커플 초대'} />
      <div className="invitation flex flex-col items-center px-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">당신의 커플 코드</h1>
          <h2 
            className="text-3xl font-bold text-primary-500 cursor-pointer hover:opacity-80 relative"
            onClick={handleCopyClick}
          >
            {coupleCode.code || '로딩중...'}
            {copied && (
              <svg 
                className="w-6 h-6 text-green-500 animate-fade-in-out absolute top-1/2 -translate-y-1/2 -right-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </h2>
          <h2 className="text-lg text-gray-600">유효 시간: {remainingTime}</h2>
        </div>

        <div className="w-full max-w-md space-y-4 mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-800">커플 코드 입력하기</h1>
          <div className="flex justify-center w-full">
            <input
              className="
                w-3/5 px-4 py-[5px] 
                text-3xl text-center
                border border-gray-300 
                rounded-lg
                bg-white
                box-border
                transition-all duration-300 ease-in-out
                hover:bg-gray-100
                focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#4CAF50]/20
                "
              placeholder="ABCD 789A"
              maxLength={9}
              value={inputCode}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, '').toUpperCase();
                if (value.length > 4) {
                  value = value.slice(0, 4) + ' ' + value.slice(4);
                }
                setInputCode(value);
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-md space-y-2 mt-4 flex flex-col justify-center items-center">
          <h3 className="text-lg font-bold text-center text-gray-700">만나기 시작한 날</h3>
          <Input
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={handleDateChange}
            onKeyDown={(e) => {
              // 키보드 입력 방지
              e.preventDefault();
            }}
            className="w-1/2 text-center"
          />
        </div>

        <div className="w-full max-w-md space-y-2 mt-8 flex flex-col justify-center items-center gap-2">
          <MainButton 
            onClick={handleStartMatching}
            children={'시작하기'}
            className="w-3/4 py-3 bg-red-300"
          />
          <MainButton
            onClick={handleMatchComplete}
            className="w-3/4 py-3 bg-blue-300"
            children={'상대방이 입력했습니다'}
          />
        </div>
      </div>
    </div>
  );
}

export default CoupleCode;