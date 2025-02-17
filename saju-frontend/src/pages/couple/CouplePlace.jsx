import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import { Calendar } from "../../components/Calendar";
import { useNavigate } from "react-router-dom";
import EmblaCarousel from "../../components/EmblaCarousel";
import couplebg from "../../assets/couplebg.webp";
import spots from "../../data/spots.json";
import { useState } from "react";

function CouplePlace() {
  const [goodDates, setGoodDates] = useState([]); // YYYY-MM-DD 형식
  const [badDates, setBadDates] = useState([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

  // 선택된 날짜에 해당하는 데이터 찾기
  const selectedSpots = selectedDate ? 
    spots.find(spot => spot[selectedDate])?.[selectedDate] || [] : 
    spots[0]?.[Object.keys(spots[0])[0]] || [];

  return (
    <div className="flex flex-col min-h-screen py-[60px] relative justify-center items-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${couplebg})` }}>
      <TopBar2 mainText={"데이트 코스 추천"} />
      <div className="mx-4 bg-white rounded-lg bg-opacity-70">
        <EmblaCarousel data={selectedSpots} />
      </div>

      <div className="flex flex-col w-11/12 p-4 my-2 bg-white rounded-lg bg-opacity-70 items-center justify-center">
        <Calendar 
          goodDates={goodDates} 
          badDates={badDates} 
          onDateSelect={handleDateSelect}
        />
      </div>

      <BottomNav />
    </div>
  );
}

export default CouplePlace;