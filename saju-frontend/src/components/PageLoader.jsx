import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";
import React, { useRef, useEffect } from "react";
import Random from "../assets/animations/heart.json";
import frogLoader from "../assets/images/frogLoader.gif";

export default function PageLoader() {
  return (
    <div className="w-full h-screen font-NanumR bg-black flex gap-y-4 items-center justify-center flex-col">
      <img src={frogLoader} className="w-28 h-28" />
      <div>
        <TypeAnimation
          sequence={["사주팔짝 로딩중...", 1000]}
          speed={1}
          repeat={Infinity}
          className="text-white font-NanumL text-base font-bold"
        />
      </div>
    </div>
  );
}
