// // MatchReport.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import BottomNav from "../../components/BottomNav";
// import BackButton from "../../components/BackButton";
// import SajuGrid from "../../components/SajuGrid";
// import Heart from "../../components/Heart";
// import { usersDetail } from "../../data/usersDetail";
// import SajuAuthorBubble from "../../components/SajuAuthorBubble";
// import { useState, useEffect } from "react";
// import { useGet, usePost } from '../../hooks/useApi'

// function MatchReport() {
//   const { partnerId } = useParams();
//   const navigate = useNavigate();
//   const mutation = usePost();
//   // usersDetail 배열에서 id가 일치하는 유저를 찾음 (숫자와 string 비교를 위해 == 사용)
//   // const user = usersDetail.find((u) => u.id == partnerId);
//   const [user, setUser] = useState({
//     id: 1,
//     nickname: "",
//     score: 99,
//     profileImage:
//       "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//     age: 25,
//     region: "서울시 용산구",
//     memberType: "무토",
//     introduction: "찰떡궁합인분 찾습니다^^",
//     year: "을해",
//     month: "기묘",
//     day: "임자",
//     time: "정미",
//     religion: "무교",
//     smoking: "비흡연",
//     drinking: "음주 안함",
//     height: 180,
//     cityCode: "1100000000",
//     dongCode: "1117000000",
//     birthDay: "",
//     birthTime: "",
//     birthTimeUnknown: false,
//     harmony: "",
//     chemi: "",
//     good: "",
//     bad: "",
//     advice: "",
//   });
//   const {data, isPending, error} = useGet(`/match/${partnerId}`)


//   useEffect(() => {
//     if (data) {
//       setUser(data)
//     }
//   }, [data])

//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center font-NanumR">
//         <p>유저 정보를 찾을 수 없습니다.</p>
//       </div>
//     );
//   }

//   // const [comments, setComments] = useState(user.comments || []);
//   // const [comment, setComment] = useState("");

//   const handleMatchRequest = () => {
//     mutation.mutate(
//       { uri: `/chats/${partnerId}`, payload: {} },
//       {
//         onSuccess: () => {
//           navigate(`/chats/${partnerId}`);
//           console.log("매칭 성공");
//         },
//         onError: (error) => {
//           console.log("매칭 실패.", error);
//         },
//       }
//     );
//     // alert("매칭 신청 완료!");
//   };

//   if (isPending) {
//     return <div>로딩 중...</div>
//   }
//   if (error) {
//     return <div>에러 발생: {error.message}</div>
//   }

//   return (
//     <div className="flex flex-col relative items-end pb-[60px] bg-gray-50 font-NanumR">
//       <BackButton
//         className="absolute top-8 left-5 z-10"
//         onClick={() => navigate(-1)}
//       />
//       <div className="relative">
//         <img
//           className="object-cover w-full max-w-md mx-auto"
//           src={user.profileImage}
//           alt={`${user.nickname}님의 프로필 사진`}
//         />
//         {/* <button
//           className="absolute bottom-6 border border-gray-100 right-10 w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center"
//           onClick={handleMatchRequest}
//         >
//           <img
//             src="https://img.icons8.com/?size=100&id=12582&format=png&color=000000"
//             alt="매칭 신청하기"
//             className="w-6 h-6"
//           />
//         </button> */}
//       </div>
//       <div className="flex flex-col justify-between bg-white rounded-t-3xl px-5 pt-5 relative z-10 w-full max-w-md mx-auto">
//         <div className="flex justify-between items-center">
//           <div className="flex flex-col gap-y-1">
//             <p className="text-2xl font-semibold">
//               {user.nickname}, {user.age}
//             </p>
//             <p className="text-gray-400 text-sm">{user.region}</p>
//             <p className="text-gray-500 text-sm">{user.introduction}</p>
//           </div>
//           <Heart score={user.score} size="large" />
//         </div>
//         <SajuGrid
//           saju={{
//             year: user.year,
//             month: user.month,
//             day: user.day,
//             time: user.time,
//           }}
//           title={false}
//         />
//         <div className="flex flex-col gap-y-2 mt-4">
//           <h3 className="text-lg font-semibold text-gray-800 mt-2">
//             궁합 엿보기
//           </h3>
//           <p className="text-gray-500 text-sm">{user.harmony}</p>
//         </div>
//       </div>
//       <button onClick={handleMatchRequest}>채팅하기 </button>
//       <BottomNav />
//     </div>
//   );
// }

// export default MatchReport;


// // data/usersDetail.js
// // export const usersDetail = [
// //   {
// //     id: 1,
// //     nickname: "대장나무",
// //     score: 99,
// //     profileImage:
// //       "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //     age: 25,
// //     region: "서울시 용산구",
// //     memberType: "무토",
// //     introduction: "찰떡궁합인분 찾습니다^^",
// //     year: "을해",
// //     month: "기묘",
// //     day: "임자",
// //     time: "정미",
// //     religion: "무교",
// //     smoking: "비흡연",
// //     drinking: "음주 안함",
// //     height: 180,
// //     cityCode: "1100000000",
// //     dongCode: "1117000000",
// //     birthDay: "1981-09-01",
// //     birthTime: "12:00",
// //     birthTimeUnknown: false,
// //     harmony:
// //       "두분의 궁합은 어쩌구 저쩌구 이러쿵 저러쿵 아주 잘 맞으시고, 노래도 잘 부르실 것 같습니다.",
// //     chemi: "케미가 아주 좋습니다.",
// //     good: "긍정적인 면이 많습니다.",
// //     bad: "조금 급한 면이 있습니다.",
// //     advice: "서두르지 말고 천천히 관계를 쌓아가세요.",
// //   },

import { useParams, useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import BackButton from "../../components/BackButton";
import SajuGrid from "../../components/SajuGrid";
import Heart from "../../components/Heart";
import { usersDetail } from "../../data/usersDetail";
import SajuAuthorBubble from "../../components/SajuAuthorBubble";
import { useState } from "react";
import { usePost } from '../../hooks/useApi'

function MatchReport() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const mutation = usePost();
  // usersDetail 배열에서 id가 일치하는 유저를 찾음 (숫자와 string 비교를 위해 == 사용)
  const user = usersDetail.find((u) => u.id == partnerId);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center font-NanumR">
        <p>유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // const [comments, setComments] = useState(user.comments || []);
  // const [comment, setComment] = useState("");

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
    alert("매칭 신청 완료!");
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
        {/* <button
          className="absolute bottom-6 border border-gray-100 right-10 w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center"
          onClick={handleMatchRequest}
        >
          <img
            src="https://img.icons8.com/?size=100&id=12582&format=png&color=000000"
            alt="매칭 신청하기"
            className="w-6 h-6"
          />
        </button> */}
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
