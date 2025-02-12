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

function Couple() {
  const goodDates = ['2025-02-13', '2025-02-14']; // YYYY-MM-DD 형식
  const badDates = ['2025-02-22', '2025-02-23'];
  const navigate = useNavigate();
  const data = [
    {
      member: {
        name: "윤수정",
        nickname: "수정나무",
        memberType: "기토",
        age: 29,
        profileImage: "https://cdn.pixabay.com/photo/2020/05/09/13/29/photographer-5149664_1280.jpg",
        region: "서울시 동작구",

      },
      partner: {
        name: "박효신",
        nickname: "대장나무",
        memberType: "계수",
        age: 29,
        profileImage: "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
        region: "서울시 용산구",
      },
      startDate: "2024-01-01",
    },
  ];
  const diffDays = dayjs().diff(dayjs(data[0].startDate), 'day');
  
  return (
    <div className="pb-[60px] flex flex-col justify-center items-center">
      <TopBar />
      
        {data.map((couple, index) => (
          <div key={index} className="w-11/12 my-3 bg-white rounded-md shadow-md py-5 flex justify-between items-center border-t border-gray-100">
            <div className="flex items-center w-1/5 justify-center">
              <div className="flex flex-col items-center text-center">
                <SajuUserBubble skyElement={couple.member.memberType} size="small" />
                <p className="text-gray-600 text-sm mb-1">{couple.member.age}세</p>
                <p className="text-gray-500 text-xs mb-1">{couple.member.region.split(" ")[0]}</p>
                <p className="text-gray-500 text-xs">{couple.member.region.split(" ")[1]}</p>
              </div>
            </div>
            <div className="w-1/5 flex justify-center">
              <div className="flex flex-col items-center text-center">
                <p className="font-bold text-sm mb-1">{couple.member.nickname}</p>
                <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                  <img 
                    src={couple.member.profileImage} 
                    alt="profile" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/5 flex justify-center">
              <Heart score={diffDays} size="small" />
            </div>

            <div className="w-1/5 flex justify-center">
              <div className="flex flex-col text-center items-center justify-center">
                <p className="font-bold text-sm mb-1">{couple.partner.nickname}</p>
                <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                  <img 
                    src={couple.partner.profileImage} 
                    alt="profile" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/5 flex justify-center">
              <div className="flex flex-col text-center items-center justify-center">
                <SajuUserBubble skyElement={couple.partner.memberType} size="small" />
                <p className="text-gray-600 text-sm mb-1">{couple.partner.age}세</p>
                <p className="text-gray-500 text-xs mb-1">{couple.partner.region.split(" ")[0]}</p>
                <p className="text-gray-500 text-xs">{couple.partner.region.split(" ")[1]}</p>
              </div>
            </div>
          </div>
        ))}
      <div className="fortune-section flex flex-wrap w-full items-center justify-center gap-1 pb-2">
        <FortuneButton content="커플 신년" url="/couple/year" size="small" />
        <FortuneButton content="커플 궁합" url="/couple/compatibility" size="small" />
        <MainButton 
        onClick={() => navigate('/couple/place')}
        className="w-1/2 font-bold text-xl py-1 bg-[#f4cdd4] hover:bg-[#f0778c] border-2 border-red-500" 
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