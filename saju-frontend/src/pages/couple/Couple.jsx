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

import LoadingSpinner from "../../components/LoadingSpinner";
import PageLoader from "../../components/PageLoader";

function Couple() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [couple, setCouple] = useState(null);
  const [goodDates, setGoodDates] = useState([]); // YYYY-MM-DD 형식
  const [badDates, setBadDates] = useState([]);
  const {
    data: coupleData,
    isPending: isCouplePending,
    error: coupleError,
  } = useGet(`/api/couples`);
  const { data, isPending, error } = useGet(`/api/couples/date?month=${month}`);

  useEffect(() => {
    if (data) {
      setGoodDates(data.goodDates);
      setBadDates(data.badDates);
    }
  }, [data]);

  useEffect(() => {
    if (coupleData) {
      setCouple(coupleData);
    }
  }, [coupleData]);

  if (isCouplePending)
    return (
      <div>
        <PageLoader />
        {/* <p>커플 데이터 로딩중...</p> */}
      </div>
    );
  if (error) return <div>{error}</div>;
  if (isCouplePending) return <div>커플 Loading...</div>;
  if (coupleError) return <div>에러가 발생했습니다: {coupleError.message}</div>;

  return (
    <div
      className="flex flex-col h-screen py-[58px] relative justify-center items-center bg-cover bg-center bg-no-repeat scrollbar-hidden"
      style={{ backgroundImage: `url(${couplebg})` }}
    >
      <div className="flex flex-col w-11/12 mx-2 p-2 bg-white rounded-lg bg-opacity-70 gap-y-2 items-center justify-center">
        <TopBar />
        {Array.isArray(coupleData) ? (
          coupleData.map((couple, index) => (
            <CoupleProfile
              key={index}
              couple={{
                ...couple,
                member: {
                  ...couple.member,
                  memberType: couple.member.celestialStem,
                },
                partner: {
                  ...couple.partner,
                  memberType: couple.partner.celestialStem,
                },
              }}
            />
          ))
        ) : (
          <CoupleProfile
            couple={{
              ...coupleData,
              member: {
                ...coupleData.member,
                memberType: coupleData.member.celestialStem,
              },
              partner: {
                ...coupleData.partner,
                memberType: coupleData.partner.celestialStem,
              },
            }}
          />
        )}

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
