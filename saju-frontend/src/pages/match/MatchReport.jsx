import { useParams, useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import BackButton from "../../components/BackButton";
import SajuGrid from "../../components/SajuGrid";
import Heart from "../../components/Heart";
import { usersDetail } from "../../data/usersDetail";
import SajuAuthorBubble from "../../components/SajuAuthorBubble";
import { useEffect, useState } from "react";
import { useGet, usePost } from '../../hooks/useApi'

function MatchReport() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const mutation = usePost();
  const {data, isPending, error} = useGet(`api/match/${partnerId}`);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  
  if (isPending) {
    return (
      <div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleMatchRequest = () => {
    mutation.mutate(
      { uri: `api/chats/${partnerId}`},
      {
        onSuccess: () => {
          navigate(`/chats/${partnerId}`);
          console.log("매칭 성공");
        },
        onError: (error) => {
          console.log("매칭 실패.", error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col relative items-end pb-[60px] bg-gray-50 font-NanumR">
      <BackButton
        className="absolute top-8 left-5 z-10"
        onClick={() => navigate(-1)}
      />
      <div className="relative">
        <img
          className="object-cover w-full max-w-md mx-auto"
          src={user.profileImage}
          alt={`${user.nickname}님의 프로필 사진`}
        />
        <button
          className="absolute bottom-6 border border-gray-100 right-10 w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center"
          onClick={handleMatchRequest}
        >
          <img
            src="https://img.icons8.com/?size=100&id=12582&format=png&color=000000"
            alt="매칭 신청하기"
            className="w-6 h-6"
          />
        </button>
      </div>
      <div className="flex flex-col justify-between bg-white rounded-t-3xl px-5 pt-5 relative z-10 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <p className="text-2xl font-semibold">
              {user.nickname}, {user.age}
            </p>
            <p className="text-gray-400 text-sm">{user.region}</p>
            <p className="text-gray-500 text-sm">{user.introduction}</p>
          </div>
          <Heart score={user.score} size="large" />
        </div>
        <SajuGrid
          saju={{
            year: user.year,
            month: user.month,
            day: user.day,
            time: user.time,
          }}
          title={false}
        />
        <div className="flex flex-col gap-y-2 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mt-2">
            궁합 엿보기
          </h3>
          <p className="text-gray-500 text-sm">{user.harmony}</p>
        </div>
      </div>
      <button onClick={handleMatchRequest}>채팅하기 </button>
      <BottomNav />
    </div>
  );
}

export default MatchReport;
