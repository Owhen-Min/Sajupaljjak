import React, { useState, useEffect, useRef } from "react";
import CustomCarousel from "../../components/CustomCarousel";
// 로컬 이미지 가져오기
import profile1 from "../../assets/images/profile1.jpeg";
import profile2 from "../../assets/images/profile2.jpeg";
import profile3 from "../../assets/images/profile3.jpeg";
import BottomNav from "../../components/BottomNav";
import StarButton from "../../components/StarButton";
import Random from "../../assets/animations/random.json";
import Lottie from "lottie-react";
import { useGet } from "../../hooks/useApi";

const users = [
  {
    id: 1,
    nickname: "이종문",
    score: 99,
    profileImage: profile1,
    region: 1123123123,
    age: 28,
    celestialStem: "무토",
    introduction: "찰떡궁합인분 찾습니다^^",
  },
  {
    id: 2,
    nickname: "오수영",
    score: 99,
    profileImage: profile2,
    region: 1234123,
    age: 26,
    celestialStem: "갑목",
    introduction: "찰떡궁합인분 찾습니다^^",
  },
  {
    id: 3,
    nickname: "윤크리스탈",
    score: 99,
    profileImage: profile3,
    region: 123124123412,
    age: 31,
    celestialStem: "갑목",
    introduction: "찰떡궁합인분 찾습니다^^",
  },
];

const Solo = () => {
  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // const {data, isPending, error } = useGet("api/match/top");
  // const users = data;

  // 5초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === users.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      // 0.5는 기본 속도의 50%로 느리게 재생합니다.
      lottieRef.current.setSpeed(0.5);
    }
  }, []);

  // 닷 클릭 시 해당 인덱스로 이동
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  if (isPending) return <div>로딩중 이미지</div>;
  if (error) return <div>에러 : {error.message}</div>;

  return (
    <div className="w-full h-full font-nanumNeo">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <span>로고</span>
          <h1 className="text-lg font-bold">사주팔짝</h1>
        </div>
      </header>
      <div className="w-full h-full bg-red-50/60">
        {/* 궁합 매칭 */}
        <div className="h-60 mt-1">
          <div className="px-4 flex flex-col gap-y-1 py-3">
            <div className="text-2xl font-extrabold text-[#d35050]">
              궁합 매칭
            </div>
            <div className="font-medium text-slate-700/80">
              궁합에 맞는 사람을 만나보세요!
            </div>
          </div>
          <CustomCarousel />
        </div>

        {/* 랜덤 매칭 */}
        <div className="mt-36">
          <div className="px-4 flex flex-col gap-y-1 py-3">
            <div className="text-2xl font-extrabold text-[#d35050]">
              랜덤 매칭
            </div>
            <div className="font-medium text-slate-700/80">
              3분간의 설레임, 익명의 상대방과 대화해보세요!
            </div>
          </div>
        </div>
        <div className="flex items-center pt-3 w-full h-[260px] flex-col ">
          <div style={{ width: 160, height: 160 }}>
            <Lottie animationData={Random} lottieRef={lottieRef} loop={true} />
          </div>
          <div className="font-main1  text-white text-base cursor-pointer font-medium  py-2 bg-[#d35050] w-[45%] rounded-2xl flex items-center justify-center">
            랜덤 채팅 입장
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Solo;
