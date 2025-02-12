import { useState, useEffect } from "react";
import { TopBar2 } from "../../components/TopBar2";
import { Calendar } from "../../components/Calendar";
import MainButton from "../../components/MainButton";

function MyPageEditCouple() {
  const [meetDate, setMeetDate] = useState('2024-01-01');
  const [daysCount, setDaysCount] = useState(0);

  useEffect(() => {
    // TODO: API로 현재 저장된 만난 날짜 가져오기
    
    // 만난 일수 계산
    if (meetDate) {
      const start = new Date(meetDate);
      const today = new Date();
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
    }
  }, []);

  const handleSave = async () => {
    if (!meetDate) {
      alert('만난 날짜를 선택해주세요.');
      return;
    }

    try {
      // TODO: API로 수정된 만난 날짜 저장
      
      // 저장 후 날짜 다시 계산
      const start = new Date(meetDate);
      const today = new Date();
      const diffTime = Math.abs(today - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
      
      alert('성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleBreakUp = async () => {
    // TODO: API로 헤어지기 처리
    alert('헤어지기 처리 완료');
  };

  return(
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar2 mainText={"커플 정보 수정하기"} />
      
      <div className="flex flex-col items-center px-6 mt-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">우리가 만난 지</h2>
          <p className="text-3xl font-bold text-primary-500">{daysCount}일</p>
        </div>

        <div className="w-full max-w-md space-y-2 mt-4">
          <h3 className="text-lg font-bold text-center text-gray-700">만난 날짜 수정하기</h3>
          {/* <Calendar
            disableFuture={true}
            onChange={(v) => setMeetDate(v)}
            value={meetDate}
          /> */}
        </div>

        <MainButton 
          onClick={handleSave}
          children={'저장하기'}
          className="w-full max-w-md py-3 mt-4"
        />

        <MainButton 
          onClick={handleBreakUp}
          children={'헤어지기'}
          className="w-1/2 max-w-md py-3 mt-4"
        />
      </div>
    </div>
  );
}

export default MyPageEditCouple;
