// BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  HomeIcon,
  BookOpenIcon,
  HeartIcon,
  UserIcon,
  CalendarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

export default function BottomNav() {
  // const { isCouple } = useAuth();
  const isCouple = localStorage.getItem("relation")
  const location = useLocation();

  // 메뉴 항목 정의 (isCouple 여부에 따라 매칭/캘린더 구분)
  const navItems = isCouple
    ? [
        { path: "/couple", label: "메인", icon: HomeIcon },
        { path: "/community", label: "커뮤니티", icon: BookOpenIcon },
        { path: "/fortune", label: "운세", icon: HeartIcon },
        { path: "/couple/place", label: "캘린더", icon: CalendarIcon },
        { path: "/chats", label: "채팅", icon: ChatBubbleOvalLeftEllipsisIcon },
      ]
    : [
        { path: "/solo", label: "메인", icon: HomeIcon },
        { path: "/community", label: "커뮤니티", icon: BookOpenIcon },
        { path: "/fortune", label: "운세", icon: HeartIcon },
        { path: "/match", label: "매칭", icon: UserIcon },
        { path: "/chats", label: "채팅", icon: ChatBubbleOvalLeftEllipsisIcon },
      ];

  // 현재 활성화된 메뉴 인덱스 결정 (부분 경로 매칭)
  let activeIndex = navItems.findIndex((item) =>
    location.pathname.startsWith(item.path)
  );
  if (activeIndex < 0) activeIndex = 0;

  return (
    <nav className="rounded-xl fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[380px] max-w-md h-16 bg-white shadow-lg z-50 font-NanumR">
      <div className="relative h-full">
        {/* 슬라이딩 인디케이터 */}
        <div
          className="absolute bottom-0 rounded-b-xl left-0 h-1 bg-red-600 transition-all duration-300"
          style={{
            width: `${100 / navItems.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        ></div>
        <div className="flex h-full">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeIndex;
            return (
              <Link
                key={idx}
                to={item.path}
                className="flex-1 flex flex-col items-center justify-center transition transform hover:scale-105"
              >
                <Icon
                  className={`w-5 h-5 mb-1 transition-colors duration-300 ${
                    isActive ? "text-red-600" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isActive ? "text-red-600 font-semibold" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
