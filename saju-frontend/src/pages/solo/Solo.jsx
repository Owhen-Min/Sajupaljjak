import React, { useState, useEffect } from "react";
import CustomCarousel from "../../components/CustomCarousel";
// 로컬 이미지 가져오기
import profile1 from "../../assets/images/profile1.jpeg";
import profile2 from "../../assets/images/profile2.jpeg";
import profile3 from "../../assets/images/profile3.jpeg";

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

  // 5초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === users.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 닷 클릭 시 해당 인덱스로 이동
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <span>로고</span>
          <h1 className="text-lg font-bold">사주팔짝</h1>
        </div>
      </header>
      <CustomCarousel />
    </div>
  );
};

export default Solo;
