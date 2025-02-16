import { useParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import BackButton from "../../components/BackButton";
import SajuGrid from "../../components/SajuGrid";
import Heart from "../../components/Heart";
import { useGet, usePost } from "../../hooks/useApi";
import { testUsers } from "../../data/user";
import { useNavigate } from "react-router-dom";

function MatchReport() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const { mutate: requestMatch, isLoading } = usePost(null, {
    onSuccess: (response) => {
      const chatRoomId = response.chatRoomId;
      navigate(`/chats/${chatRoomId}`);
    },
    onError: (error) => {
      if (error.message === 'Network Error') {
        console.error('CORS 또는 네트워크 에러:', error);
        alert('서버 연결에 실패했습니다. CORS 설정을 확인해주세요.');
      } else {
        console.error('매칭 신청 실패:', error);
        alert('매칭 신청에 실패했습니다.');
      }
    }
  });

  // const { data: user, isLoading, error } = useGet(`/api/match/${partnerId}`);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;
  const user = testUsers[0];
  
  const handleMatchRequest = () => {
    requestMatch({
      uri: `/api/chats/${partnerId}`,
    });
  };

  return (
    <div className="flex flex-col relative items-end pb-[60px]">
      <BackButton className="absolute top-8 left-5 z-10"/>
      <div className="relative">
        <img className="flex top-0 left-0 object-cover w-[400px] h-auto mb-[-20px]" src={user.profileImage} alt={`${user.name}님의 프로필 사진`} />
        <button 
          className="absolute bottom-6 border-2 border-gray-100 right-10 w-[40px] h-[40px] rounded-full bg-white shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center"
          onClick={handleMatchRequest}
          disabled={isLoading}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=12582&format=png&color=000000" 
            alt="매칭 신청하기" 
            className={`w-[25px] h-[25px] ${isLoading ? 'opacity-50' : ''}`}
          />
        </button>
      </div>
      <div className="flex flex-col justify-between bg-white rounded-t-3xl px-5 pt-5 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <p><span className="mb-2 text-2xl font-semibold font-a">{user.nickname}, {user.age}</span></p>
            <p className="text-gray-400">{user.region}</p>
            <p className="text-gray-500">{user.introduction}</p>
          </div>
          <Heart score = {user.score} size="large" />
        </div>
        <SajuGrid saju={{year:user.year, month:user.month, day:user.day, time:user.time}} title={false}/>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-800 mt-2">궁합 엿보기</h3>
          <p className="text-gray-500">{user.harmony}</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default MatchReport;
