import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import { Calendar } from "../../components/Calendar";
import { useNavigate } from "react-router-dom";
import EmblaCarousel from "../../components/EmblaCarousel";
import couplebg from "../../assets/couplebg.webp";
import spots from "../../data/spots.json";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useApi";


function CouplePlace() {
  const [goodDates, setGoodDates] = useState([]); // YYYY-MM-DD 형식
  const [badDates, setBadDates] = useState([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`
  );


  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  //오늘 날짜 받는 부분분

  const {
    data: dateData,
    isPending: datePending,
    error: dateError,
  } = useGet(`api/couples/date?month=${month}`);

  const {
    data: placeData,
    isPending: placePending,
    error: placeError,
  } = useGet(`api/places?date=${selectedDate}`); //body에 담아서 하려면 POST??

  useEffect(() => {
    if (dateData) {
      setGoodDates(dateData.goodDates);
      setBadDates(dateData.badDates);
    }
  }, [dateData]);

  useEffect(() => {
    if (placeData) {
      console.log(placeData);
    }
  }, [placeData]);

  const handleDateSelect = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setMonth(date.month() + 1); //월 잘 바뀌는지 확인
  };

  if (datePending || placePending) {
    return <div> 로딩 중 </div>;
  }
  if (dateError || placeError) {
    return <div> 에러 발생 </div>;
  }

  return (
    <div
      className="flex flex-col min-h-screen py-[60px] relative justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${couplebg})` }}
    >
      <TopBar2 mainText={"데이트 코스 추천"} />
      <div className="mx-4 bg-white rounded-lg bg-opacity-70">
        <EmblaCarousel data={selectedPlaces} />
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