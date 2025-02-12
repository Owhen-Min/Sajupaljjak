import BottomNav from "../../components/BottomNav";
import Heart from "../../components/Heart";
import TopBar2 from "../../components/TopBar2";
import FortuneButton from "../../components/FortuneButton";
import SajuUserBubble from "../../components/SajuUserBubble";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import { Calendar } from "../../components/Calendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { testUsers } from "../../data/user";
import UserList from "../../components/UserList";

function CouplePlace() {
  const goodDates = ['2025-02-01','2025-02-22', '2025-02-14']; // YYYY-MM-DD 형식
  const badDates = ['2025-02-03','2025-02-17', '2025-02-23'];
  const navigate = useNavigate();
  
  return (
    <div className="relative flex flex-col justify-center items-center pt-[100px]">
      <TopBar2 mainText={"데이트 코스 추천"} />
      <UserList users={testUsers} />

      <div className="calendar-section flex justify-center items-center mt-5 pt-[23.5px] px-5 w-full max-w-3xl">
        <Calendar goodDates={goodDates} badDates={badDates} />
      </div>

      <BottomNav />
    </div>
  );
}

export default CouplePlace;