import React, { useState, useEffect, useRef } from "react";
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
import PageLoader from "../../components/PageLoader";

export default function Solo() {
  const [currentTab, setCurrentTab] = useState("main");
  const [matchingTab, setMatchingTab] = useState("compatibility");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
// <<<<<<< HEAD

//   const { data, isPending, error } = useGet("api/match/top");

//   useEffect(() => {
//     if (data) {
//       setUsers(data || []);
//     }
//   }, [data]);

//   if (isPending)
//     return (
//       <div>
//         <PageLoader />
//       </div>
//     );
//   if (error) return <div>Error: {error.message}</div>;
// =======
  // const { data, isPending, error } = useGet("api/match/top");
  const { mutate: createRandom } = usePost("/api/random", {
    onSuccess:(response) => {
      // if (response.message){
      //   console.log("랜덤채팅 실패")
      // } 매칭 실패가 백엔드에서 처리하는 건지지
      console.log('랜덤채팅 매칭 성공')
      navigate(`/chats/random/${response.chatRoomId}`)
    },
    onError: (error) => {
      console.log("error", error);
    }
  });
  // useState(() => {
  //   if (data) {
  //     setUsers(data);
  //   }
  // }, [data]);
  // if (isPending) return <div><LoadingSpinner/></div>;
  // if (error) return <div>Error: {error.message}</div>;

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

function CompatibilityMatching({ users }) {
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="text-center mt-4 text-gray-500">
        매칭된 유저가 없습니다.
      </div>
    );
  }

  const slides =
    users.length > 1 ? [users[users.length - 1], ...users, users[0]] : users;
  const [index, setIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (users.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [users.length]);

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
      setTimeout(() => setTransitionEnabled(true), 50);
    }
  }, [transitionEnabled]);

  return (
    <div className="pt-5 flex flex-col items-center px-4">
      <div className="mb-4 text-left w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          운명이 점지해준 사람을 만나보세요
        </h2>
        <p className="text-sm text-gray-600">
          사주 궁합이 가장 높은 상대방을 추천해드립니다.
        </p>
      </div>
      <CustomCarousel users={users} />
    </div>
  );
}


function RandomMatching({ createRandom }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center pt-5 p-4">
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
