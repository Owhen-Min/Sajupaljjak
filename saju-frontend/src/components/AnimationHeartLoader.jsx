import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animations/heart.json"; // JSON 파일 경로

const AnimationComponent = () => {
  return (
    <div style={{ width: 70, height: 70 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimationComponent;
