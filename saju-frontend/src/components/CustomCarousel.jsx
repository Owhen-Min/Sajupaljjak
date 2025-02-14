import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import UserCard from "./UserCard";

export default function SquareCarousel({ users }) {
  const [goToSlide, setGoToSlide] = useState(0);

  const slides = Array.from({ length: users.length }, (user, index) => ({
    key: index,
    content: (
      <div
        className="w-48 h-48 mt-5 flex items-center justify-center text-white bg-red-400 text-2xl font-bold rounded-xl cursor-pointer "
        onClick={() => setGoToSlide(index)}
      >
        <UserCard user={users[index]} />
        {/* <div class="relative group">
          <div class="w-52 h-52 absolute bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-100 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="w-52 h-52 cursor-pointer relative px-7 py-7 bg-slate-100 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div class="flex-full h-full items-center justify-center"></div>
          </div>
        </div> */}
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
    <div className="w-[90%] h-64 mx-auto flex ">
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={3} // 간격을 조금 넓혀 절반 정도 보이게 설정
        showNavigation={false}
        animationConfig={config.gentle}
      />
    </div>
  );
}
