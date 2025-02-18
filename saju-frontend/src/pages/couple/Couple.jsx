import TopBar from "../../components/TopBar";
import CoupleProfile from "../../components/CoupleProfile";
import FortuneButton from "../../components/FortuneButton";
import MainButton from "../../components/MainButton";
import { Calendar } from "../../components/Calendar";
import BottomNav from "../../components/BottomNav";
import couplebg from "../../assets/couplebg.webp";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

// import LoadingSpinner from "../../components/LoadingSpinner";

function Couple() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { data, isPending, error } = useGet(`/api/date?month=${month}`);
  
  const {
    data: coupleData,
    isPending: isCouplePending,
    error: coupleError,
  } = useGet(`/api/couples`);

  const [goodDates, setGoodDates] = useState([]); // YYYY-MM-DD 형식
  const [badDates, setBadDates] = useState([]);
  const [couple, setCouple] = useState({

    coupleId: 1,
    member: {
      memberId: 1001,
      nickname: "수정나무",
      profileImage: "https://example.com/profile1.jpg",
      region: 11010,
      age: 29,
      celestialStem: "기토",
    },
    partner: {
      memberId: 1002,
      nickname: "대장나무",
      profileImage: "https://example.com/profile2.jpg",
      region: 11020,
      age: 29,
      celestialStem: "계수",
    },
    startDate: "2023-05-15T14:30:00",
  })

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setGoodDates(data.goodDates);
      setBadDates(data.badDates);
    }
  }, [data]);
  useEffect(() => {
    if (coupleData) {
      const { coupleId, ...filteredData } = coupleData;
      setCouple(filteredData);
    }
  }, [coupleData]);

  if (isPending)
    return (
      <div>
        {/* <LoadingSpinner /> */}로딩중
      </div>
    );
  if (error) return <div>{error}</div>;
  if (isCouplePending) return <div>커플 Loading...</div>;
  if (coupleError) return <div>커플 {coupleError}</div>;

  return (
    <div
      className="flex flex-col h-screen py-[58px] relative justify-center items-center bg-cover bg-center bg-no-repeat scrollbar-hidden"
      style={{ backgroundImage: `url(${couplebg})` }}
    >
      <div className="flex flex-col w-11/12 mx-2 p-2 bg-white rounded-lg bg-opacity-70 gap-y-2 items-center justify-center">
        <TopBar />
        {coupleData.map((couple, index) => (
          <CoupleProfile key={index} couple={couple} />
        ))}

        <div className="fortune-section flex flex-wrap w-full items-center justify-center gap-2 px-1 pb-2">
          <FortuneButton content="커플 신년" url="/couple/year" size="small" />
          <FortuneButton
            content="커플 궁합"
            url="/couple/compatibility"
            size="small"
          />
          <MainButton
            onClick={() => navigate("/couple/place")}
            className="w-5/12 font-bold text-lg px-0 py-2 bg-[#f4cdd4] hover:bg-[#f0778c] border-2 border-red-500"
            children={
              <p className="font-gapyeong text-black hover:text-white">
                사주 기반
                <br />
                데이트 추천
              </p>
            }
          />
        </div>

        <div className="calendar-section flex justify-center items-center py-2 px-3 w-full my-0">
          <Calendar
            goodDates={goodDates}
            badDates={badDates}
            isDisabled={true}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Couple;
