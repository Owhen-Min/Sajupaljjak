import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import UserCard from "./UserCard";

// 로컬 이미지 가져오기
import profile1 from "../assets/images/profile1.jpeg";
import profile2 from "../assets/images/profile2.jpeg";
import profile3 from "../assets/images/profile3.jpeg";

export default function SquareCarousel() {
  const [goToSlide, setGoToSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 사용자 추천 데이터
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

  // 사용자 데이터 기반 slides 배열 생성
  const slides = users.map((user, index) => ({
    key: user.id,
    content: (
      <div
        className="w-60 h-60 mt-14 flex items-center justify-center text-white text-2xl font-bold rounded-xl cursor-pointer"
        onClick={() => setGoToSlide(index)}
      >
        <UserCard user={user} />
      </div>
    ),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setGoToSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-[90%] h-60 mx-auto flex">
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={3}
        showNavigation={false}
        animationConfig={config.gentle}
      />
    </div>
  );
}
