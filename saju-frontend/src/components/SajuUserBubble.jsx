import { useState } from "react";

function SajuUserBubble({ skyElement, size = "normal", onClick }) {
  // 천간을 상위 그룹으로 매핑 (커뮤니티 필터의 색상과 통일)
  const groupMap = {
    갑목: "목",
    을목: "목",
    병화: "화",
    정화: "화",
    무토: "토",
    기토: "토",
    경금: "금",
    신금: "금",
    임수: "수",
    계수: "수",
  };

  const group = groupMap[skyElement] || "목";

  // 상위 그룹별 색상 설정 (커뮤니티 필터와 유사하게)
  const groupColors = {
    목: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
    화: { bg: "bg-red-500", text: "text-white", border: "border-red-500" },
    토: {
      bg: "bg-yellow-600",
      text: "text-white",
      border: "border-yellow-600",
    },
    금: { bg: "bg-gray-600", text: "text-white", border: "border-gray-600" },
    수: { bg: "bg-black", text: "text-white", border: "border-black" },
  };

  const style = groupColors[group];

  // 사이즈에 따른 클래스
  const sizeStyles = {
    small: "text-xs px-1.5 py-0",
    normal: "px-2 py-0",
    large: "text-lg px-3 py-0",
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div
        onClick={onClick}
        className={`h-6 flex items-center justify-center rounded-full border ${style.bg} ${style.text} ${style.border} font-NanumR text-sm font-extrabold flex items-center justify-center ${sizeStyles[size]} shadow`}
      >
        <span>{skyElement}</span>
      </div>
    </div>
  );
}

export default SajuUserBubble;
