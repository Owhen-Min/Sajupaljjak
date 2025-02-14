import React, { useState } from "react";

const StarButton = ({ children }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="relative px-6 py-3 font-semibold text-gray-900 bg-cyan-400 border-2 border-cyan-400 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-transparent hover:text-cyan-400 hover:shadow-cyan-300 overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {/* 별 요소들 (hover 상태에 따라 이동) */}
      <Star
        className={`top-[20%] left-[20%] w-[25px] ${
          hover ? "animate-move-1" : ""
        }`}
      />
      <Star
        className={`top-[45%] left-[45%] w-[15px] ${
          hover ? "animate-move-2" : ""
        }`}
      />
      <Star
        className={`top-[40%] left-[40%] w-[5px] ${
          hover ? "animate-move-3" : ""
        }`}
      />
      <Star
        className={`top-[20%] left-[40%] w-[8px] ${
          hover ? "animate-move-4" : ""
        }`}
      />
      <Star
        className={`top-[25%] left-[45%] w-[15px] ${
          hover ? "animate-move-5" : ""
        }`}
      />
      <Star
        className={`top-[5%] left-[50%] w-[5px] ${
          hover ? "animate-move-6" : ""
        }`}
      />
    </button>
  );
};

const Star = ({ className }) => (
  <div
    className={`absolute transition-all duration-700 ease-in-out ${className}`}
  >
    <svg
      viewBox="0 0 784.11 815.53"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,200,0.8)]"
    >
      <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
    </svg>
  </div>
);

export default StarButton;
