// SquareCarousel.js
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import UserCard from "./UserCard";

// 로컬 이미지 가져오기
import profile1 from "../assets/images/profile1.jpeg";
import profile2 from "../assets/images/profile2.jpeg";
import profile3 from "../assets/images/profile3.jpeg";

export default function CustomCarousel() {
  const [goToSlide, setGoToSlide] = useState(0);

  // 사용자 추천 데이터
  // 이종문 : 에러나서 user1으로 수정했습니다
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
  // (카드 디자인과 배치는 UserCard에서 정의한 그대로 사용)
  const slides = users.map((user, index) => ({
    key: user.id,
    content: (
      <div
        className="w-72 h-auto  flex items-center justify-center cursor-pointer"
        onClick={() => setGoToSlide(index)}
      >
        <UserCard user={user} />
      </div>
    ),
  }));

  // 5초마다 자동으로 다음 슬라이드로 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setGoToSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full mt-64  mx-auto flex justify-center">
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={2}
        showNavigation={false}
        animationConfig={config.gentle}
      />
    </div>
  );
}
