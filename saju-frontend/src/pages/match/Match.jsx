// Match.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList2 from "../../components/UserList2";
import { users } from "../../data/users"; // 테스트용 유저 데이터 배열
import  useInfiniteGet  from "../../hooks/useInfiniteGet";




function Match() {
  const navigate = useNavigate();
  const [displayedUsers, setDisplayedUsers] = useState([]);
  // 새로 값 받으면 data.page를 displayUser에 추가
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage} = useInfiniteGet("/api/match", { initialCursor: 0 });
  
  useEffect(() => {
    if (data) {
      setDisplayedUsers((prev) => [...prev, ...data.pages.map((page) => page.data)]);
    }
  }, [data]);

  // Intersection Observer로 무한 스크롤 구현
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    }, [fetchNextPage, hasNextPage]
  );


  return (
    <div className="h-screen flex flex-col relative">
      <Header />
      <div className="pt-5 flex-grow overflow-y-auto pb-24">
        <div className="px-4 text-left w-full max-w-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            다양한 상대방을 만나보세요
          </h2>
          <p className="text-sm text-gray-600">
            사주궁합 점수를 기반으로 매칭된 상대방을 만나보세요.
          </p>
        </div>
        <UserList2 users={displayedUsers} />
        {/* 스크롤 감지를 위한 sentinel */}
        <div ref={sentinelRef} className="h-4"></div>
      </div>
      <BottomNav />
    </div>
  );
}

function Header() {
  return (
    <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">매칭</h1>
    </header>
  );
}

export default Match;
