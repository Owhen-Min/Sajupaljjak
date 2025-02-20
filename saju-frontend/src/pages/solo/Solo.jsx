import React, { useState, useEffect, useRef } from "react";
// 로컬 이미지 가져오기
import profile1 from "../../assets/images/profile1.jpeg";
import profile2 from "../../assets/images/profile2.jpeg";
import profile3 from "../../assets/images/profile3.jpeg";
import BottomNav from "../../components/BottomNav";
import CustomCarousel from "../../components/CustomCarousel";
import Random from "../../assets/animations/random.json";
import Lottie from "lottie-react";
import { useGet, usePost } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function Solo() {

  // 하단 탭 (메인, 커뮤니티, 운세, 매칭, 채팅)
  const [currentTab, setCurrentTab] = useState("main");
  // 매칭 화면 내부 탭 (궁합매칭, 랜덤매칭)
  const [matchingTab, setMatchingTab] = useState("compatibility");

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { data, isPending, error } = useGet("api/match/top");
  const mutation = usePost();
  const createRandom = () => {
    mutation.mutate(
      { uri: `/api/random`},
      {
       onSuccess:(response) => {
       if (response.message){
         console.log("랜덤채팅 실패")
        } //매칭 실패가 백엔드에서 처리하는 건지지
       console.log('랜덤채팅 매칭 성공')
       navigate(`/chats/random/${response.chatRoomId}`)
     },
     onError: (error) => {
       console.log("error", error);
     }}

    )
  };

  useState(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  if (isPending) return <div><LoadingSpinner/></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-50 overflow-auto">
        {currentTab === "main" && (
          <div className="w-full h-full flex flex-col">
            <MatchingNav
              matchingTab={matchingTab}
              setMatchingTab={setMatchingTab}
            />
            {matchingTab === "compatibility" && (
              <CompatibilityMatching users={users} />
            )}

            {matchingTab === "random" && (
              <RandomMatching createRandom={createRandom} />
            )}
          </div>
        )}
      </div>
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

function Header() {
  return (
    <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">사주팔짝</h1>
    </header>
  );
}

function MatchingNav({ matchingTab, setMatchingTab }) {
  return (
    <div className="flex px-2 bg-gray-100 py-2 space-x-1">
      <button
        className={`px-2 py-2 text-sm ${
          matchingTab === "compatibility"
            ? "text-[#d32f2f] border-b-2 border-[#d32f2f]"
            : "text-gray-500"
        }`}
        onClick={() => setMatchingTab("compatibility")}
      >
        궁합매칭
      </button>
      <button
        className={`px-2 py-2 text-sm ${
          matchingTab === "random"
            ? "text-[#d32f2f] border-b-2 border-[#d32f2f]"
            : "text-gray-500"
        }`}
        onClick={() => setMatchingTab("random")}
      >
        랜덤매칭
      </button>
    </div>
  );
}

/**
 * 궁합매칭 캐러셀
 * - 무한 루프: [마지막, ...원본, 첫번째] 배열 사용, index 1부터 시작
 * - 모든 카드에 이미지, 인포, 버튼 항상 표시
 * - 터치(스와이프) 및 카드 클릭으로 슬라이드 이동
 */
function CompatibilityMatching({users}) {
  if (!Array.isArray(users) || users.length === 0) {
    return <div>매칭된 유저가 없습니다다.</div>;
  }
  // 컨테이너 및 카드 설정
  const containerWidth = 380; // 뷰포트 폭
  const cardWidth = 300; // 각 카드 폭
  const gap = 16; // 카드 간 간격
  const totalSlot = cardWidth + gap; // 한 슬라이드 차지 폭
  const leftover = (containerWidth - cardWidth) / 2; // 중앙 정렬 offset

  // 무한 루프용 슬라이드 배열: [마지막, ...users, 첫번째]
  const slides =
    users.length > 1 ? [users[users.length - 1], ...users, users[0]] : users;
  const [index, setIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDelta, setTouchDelta] = useState(0);

  // 7초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // 전환 후 클론 영역이면 즉시 실제 슬라이드로 이동
  const handleTransitionEnd = () => {
    if (index === 0) {
      setTransitionEnabled(false);
      setIndex(users.length);
    } else if (index === slides.length - 1) {
      setTransitionEnabled(false);
      setIndex(1);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
    }
  }, [transitionEnabled]);

  const translateX = leftover - index * totalSlot;
  const effectiveTranslateX = translateX + touchDelta;

  // 실제 users 배열 기준 활성 슬라이드 번호
  let activeIndex = 0;
  if (index === 0) {
    activeIndex = users.length - 1;
  } else if (index === slides.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex = index - 1;
  }

  // 터치(스와이프) 이벤트 핸들러
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const delta = e.touches[0].clientX - touchStartX;
      setTouchDelta(delta);
    }
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDelta > 50) {
        setIndex((prev) => prev - 1);
      } else if (touchDelta < -50) {
        setIndex((prev) => prev + 1);
      }
      setTouchStartX(null);
      setTouchDelta(0);
    }
  };

  return (
    <div className="pt-5 flex flex-col items-center px-4">
      {/* 상단 안내 문구 */}
      <div className="mb-4 text-left w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          운명이 점지해준 사람을 만나보세요
        </h2>
        <p className="text-sm text-gray-600">
          사주 궁합이 가장 높은 상대방을 추천해드립니다.
        </p>
      </div>
      {/* 캐러셀 뷰포트 */}
      <CustomCarousel users={users} />
    </div>
  );
}

function RandomMatching({ createRandom }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      // 0.5는 기본 속도의 50%로 느리게 재생합니다.
      lottieRef.current.setSpeed(0.5);
    }
  }, []);
  return (
    <div className="flex-1 flex flex-col items-center  pt-5 p-4">
      <div className="mb-4 text-left w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          새로운 인연을 시작하세요
        </h2>
        <p className="text-sm text-gray-600">
          익명의 인연과 소중한 이야기를 나눠보세요.
        </p>
        <p className="text-sm text-gray-600">
          대화가 시작하고 3분 뒤 상대방의 정보가 공개됩니다.
        </p>
      </div>
      <div className="w-full max-w-sm rounded-xl shadow-lg bg-white p-6 space-y-4">
        <div className="flex items-center w-full justify-center">
          <div style={{ width: 150, height: 150 }}>
            <Lottie lottieRef={lottieRef} animationData={Random} loop={true} />
          </div>
        </div>
        <button
          onClick={() => {
            createRandom();
          }}
          className="w-full bg-gradient-to-r from-[#d32f2f] to-[#e53935] text-white py-3 rounded-full text-sm shadow-lg hover:opacity-90 active:scale-95 transition"
        >
          랜덤채팅 시작하기
        </button>
      </div>
    </div>
  );
}


// 캐러셀로 돌릴 유저 데이터
// const users = [
//   {
//     id: 1,
//     nickname: "이종문",
//     score: 99,
//     profileImage: profile1,
//     region: 1123123123,
//     age: 28,
//     celestialStem: "무토",
//     introduction: "찰떡궁합인분 찾습니다^^",
//   },
//   {
//     id: 2,
//     nickname: "오수영",
//     score: 99,
//     profileImage: profile2,
//     region: 1234123,
//     age: 26,
//     celestialStem: "갑목",
//     introduction: "찰떡궁합인분 찾습니다^^",
//   },
//   {
//     id: 3,
//     nickname: "윤크리스탈",
//     score: 99,
//     profileImage: profile3,
//     region: 123124123412,
//     age: 31,
//     celestialStem: "갑목",
//     introduction: "찰떡궁합인분 찾습니다^^",
//   },
// ];
