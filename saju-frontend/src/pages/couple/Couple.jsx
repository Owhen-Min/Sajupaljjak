import BottomNav from "../../components/BottomNav";
import Heart from "../../components/Heart";
import TopBar from "../../components/TopBar";
import { TwoWeeksCalendar } from "../../components/Calendar";
import FortuneButton from "../../components/FortuneButton";
import { useNavigate } from "react-router-dom";
import SajuUserBubble from "../../components/SajuUserBubble";
import { useState } from "react";

function Couple() {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  return (
    <div className="pb-[80px] flex flex-col justify-center items-center">
      <TopBar />
      
      <div className="py-3 w-4/5">
        {data.map((couple, index) => (
          <div key={index} className="mb-2 bg-white rounded-md shadow-md py-2 flex justify-between items-center">
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
              <Heart score={30} size="small" />
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

      </div>
      <div className="flex flex-wrap justify-center gap-5 w-4/5 mx-auto">
        <FortuneButton content="신년 운세" url="/couple/year"/>
        <FortuneButton content="사주 궁합" url="/couple/compatibility"/>
      </div>
      <div className="flex justify-center items-center p-5">
        <TwoWeeksCalendar className="mt-5 w-80" showNeighboringMonth={true}/>
      </div>

      <BottomNav />
    </div>
  );
}

export default Couple;