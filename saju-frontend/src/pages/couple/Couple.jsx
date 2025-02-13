import TopBar from "../../components/TopBar";
import CoupleProfile from "../../components/CoupleProfile";
import FortuneButton from "../../components/FortuneButton";
import MainButton from "../../components/MainButton";
import { Calendar } from "../../components/Calendar";
import BottomNav from "../../components/BottomNav";
import couplebg from "../../assets/couplebg.webp";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coupleData } from "../../data/coupleData";

function Couple() {
  const goodDates = ['2025-02-13', '2025-02-14']; // YYYY-MM-DD 형식
  const badDates = ['2025-02-12', '2025-02-23'];
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen py-[60px] relative justify-center  items-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${couplebg})` }}>
      <div className="flex flex-col w-11/12 mx-2 p-2 my-2 bg-white rounded-lg bg-opacity-70 gap-y-2 items-center justify-center">
        <TopBar />
          {coupleData.map((couple, index) => (
            <CoupleProfile key={index} couple={couple} />
          ))}

        <div className="fortune-section flex flex-wrap w-full items-center justify-center gap-2 px-1 pb-2">
          <FortuneButton content="커플 신년" url="/couple/year" size="small" />
          <FortuneButton content="커플 궁합" url="/couple/compatibility" size="small" />
          <MainButton 
          onClick={() => navigate('/couple/place')}
          className="w-5/12 font-bold text-lg px-0 py-2 bg-[#f4cdd4] hover:bg-[#f0778c] border-2 border-red-500" 
          children={<p className="font-gapyeong text-black hover:text-white">사주 기반<br/>데이트 추천</p>} 
          />
        </div>

        <div className="calendar-section flex justify-center items-center py-2 px-3 w-full max-w-3xl">
          <Calendar goodDates={goodDates} badDates={badDates} isDisabled={true} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Couple;