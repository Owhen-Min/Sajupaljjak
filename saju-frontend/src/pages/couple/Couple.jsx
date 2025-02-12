import BottomNav from "../../components/BottomNav";
import Heart from "../../components/Heart";
import TopBar from "../../components/TopBar";
import FortuneButton from "../../components/FortuneButton";
import SajuUserBubble from "../../components/SajuUserBubble";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import { Calendar } from "../../components/Calendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import couplebg from "../../assets/couplebg.webp";
import { coupleData } from "../../data/coupleData";
import CoupleProfile from "../../components/CoupleProfile";

function Couple() {
  const goodDates = ['2025-02-13', '2025-02-14']; // YYYY-MM-DD 형식
  const badDates = ['2025-02-12', '2025-02-23'];
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen py-14 relative justify-center items-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${couplebg})` }}>
      <TopBar />
      
      {coupleData.map((couple, index) => (
        <CoupleProfile key={index} couple={couple} />
      ))}

      <div className="fortune-section flex flex-wrap w-full items-center justify-center gap-1 pb-2">
        <FortuneButton content="커플 신년" url="/couple/year" size="small" />
        <FortuneButton content="커플 궁합" url="/couple/compatibility" size="small" />
        <MainButton 
        onClick={() => navigate('/couple/place')}
        className="w-1/3 font-bold text-xl py-2 bg-[#f4cdd4] hover:bg-[#f0778c] border-2 border-red-500" 
        children={<p className="font-gapyeong text-black hover:text-white">사주 기반<br/>데이트 추천</p>} 
        />
      </div>

      <div className="calendar-section flex justify-center items-center py-2 px-5 w-full max-w-3xl">
        <Calendar goodDates={goodDates} badDates={badDates} />
      </div>

      <BottomNav />
    </div>
  );
}

export default Couple;