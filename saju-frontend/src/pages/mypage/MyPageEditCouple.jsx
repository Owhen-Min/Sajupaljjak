import { useState, useEffect } from "react";
import { TopBar2 } from "../../components/TopBar2";
import MainButton from "../../components/MainButton";
import Input from "../../components/Input";
import CoupleProfile from "../../components/CoupleProfile";
import { coupleData } from "../../data/coupleData";
import {useGet, usePost} from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

function MyPageEditCouple() {

  
  const navigate = useNavigate();
  const mutation = usePost();

  const { data, isPending, error } = useGet("/api/couples");
  if (error) {
    navigate("/couple/code");
  }
  const [meetDate, setMeetDate] = useState(data.startDate);
  const [daysCount, setDaysCount] = useState(0);

  const submit = (uri, payload) => {
    console.log("POST Request Payload:", payload);
    mutation.mutate(
      { uri, payload },
      {
        onSuccess: (data) => {
          console.log(`Post 요청 ${uri} : 성공 ${data}`);
        },
        onError: (error) => {
          console.log(`Post 요청 ${uri} : 실패패 ${error}`);
        },
      }
    );
  };

  useEffect(() => {
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
      alert("만난 날짜를 선택해주세요.");
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

      alert("성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleBreakUp = async () => {
    submit("/api/couple/breakup", { isBroken: true, startDate: '' });
    alert("헤어지기 처리 완료");
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setMeetDate(newValue);

    // 날짜 변경 시 즉시 일수 계산
    const start = new Date(newValue);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysCount(diffDays);
  };

  // if (isPending) return <div>로딩중 ...</div>;
  // if (error) return <div>에러 : {error.message}</div>;

  return (
    <div className="flex flex-col relative pt-14 min-h-screen bg-gray-50">
      <TopBar2 mainText={"커플 정보 수정하기"} />

      <div className="flex flex-col items-center px-6 mt-8 space-y-6">
        <CoupleProfile couple={coupleData[0]} />

        <div className="w-full max-w-md space-y-2 mt-4">
          <h3 className="text-lg font-bold text-center text-gray-700">
            만난 날짜 수정하기
          </h3>
          <div className="flex justify-center">
            <Input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={meetDate}
              onChange={handleDateChange}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              className="w-1/2 text-center"
            />
          </div>
        </div>

        <MainButton
          onClick={handleSave}
          children={"저장하기"}
          className="w-2/3 max-w-md py-3 mt-4 bg-red-500 text-white"
        />
        <div className="flex w-full justify-end">
          <MainButton
            onClick={handleBreakUp}
            children={"헤어지기"}
            className="w-1/5 max-w-md py-3 mt-14 text-[8px]"
          />
        </div>
      </div>
    </div>
  );
}

export default MyPageEditCouple;
