// SquareCarousel.js
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import UserCard from "./UserCard";

// 로컬 이미지 가져오기
export default function CustomCarousel({users}) {
  const [goToSlide, setGoToSlide] = useState(0);

  // users =  [];

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
