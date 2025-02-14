import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { testUsers } from "../../data/user";
import SquareCarousel from "../../components/CustomCarousel";
import Question from "../../assets/animations/question.json";
import newQuestion from "../../assets/animations/newQuestion.json";
import Lottie from "lottie-react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import GalaxyBg from "../../assets/images/galaxy.jpg";

function Solo() {
  // const { data: users, isLoading, error } = useGet("/api/match/top");
  // if (isLoading) return <div>로딩중 ...</div>;
  // if (error) return <div>에러 : {error.message}</div>;
  const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
// return (
//     <div className="solo-page h-screen flex flex-col relative py-14">
//       <TopBar />
//       <div className="section-container mt-0">
//         <div className="p-5 pb-2 text-2xl font-dokrip">궁합 매칭</div>
//         <UserList users={ testUsers } />

  return (
    <div
      className="relative  h-screen w-full bg-cover bg-center"
      // style={{ backgroundImage: `url(${GalaxyBg})` }}
    >
      <TopBar />

      <div className="section-container mt-8">
        <div className="flex items-center flex-row text-2xl pl-3 gap-x-2">
          <FaHandHoldingHeart className="text-red-600" />
          <div className="text-2xl font-dokrip">궁합 매칭</div>
        </div>

        {/* <div className="w-full overflow-hidden whitespace-nowrap bg-gray-100 py-4">
          <motion.div
            className="inline-block text-red-400 text-lg font-extrabold"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 10,
              ease: "linear",
            }}
          ></motion.div>
        </div> */}
        <div className="pl-3 font-bold mt-1">
          <span>익명의 상대방과 3분의 설레임을 느껴보세요!</span>
        </div>
        {/* <UserList users={users} /> */}
        <SquareCarousel />



  

      </div>

      {/* <div className="mt-10 w-full h-200 "></div> */}

      <div className="section-container mt-6">
        <div className="pl-3 flex flex-row text-2xl items-center gap-x-2">
          <GiPerspectiveDiceSixFacesRandom className="text-yellow-600" />
          <div className="text-2xl font-dokrip">랜덤 채팅</div>
        </div>

        <Link to={"/chats/random"} className="blur-xs">
          {/* <div
            className="relative w-80 max-w-sm aspect-[4/3] cursor-pointer rounded-3xl ml-5 bg-white"
            style={{
              backgroundImage: `url('https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_15-512.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-40 pl-4 pt-2 rounded-b-3xl">
              <span className="text-white">
                모르는 사람이랑 채팅 해보세요. 3분뒤부터 정보 확인 가능한데
              </span>
            </div>
          </div> */}
          <div className="pl-3 font-bold mt-1">
            <span>익명의 상대방과 3분의 설레임을 느껴보세요</span>
          </div>
          {/* <div className="w-full h-full flex items-center justify-center my-4">
            <div className="flex-col w-52 h-52 flex items-center justify-center border-[10px] border-red-400 text-white text-2xl font-bold rounded-xl cursor-pointer">
              <div
                className="flex items-center justify-center"
                style={{ width: 150, height: 150 }}
              >
                <Lottie animationData={Question} loop={true} />
              </div>
            </div>
          </div> */}

          <div className="w-full h-full  flex items-center justify-center mt-6">
            <div className="bg-[#ffbe1e] rounded-md hover:scale-110 transition-all duration-200">
              <Lottie
                animationData={newQuestion}
                loop={true}
                className="w-40 h-40 "
              />
            </div>
          </div>
        </Link>
      </div>

      {/* 랜덤 채팅 연결하는 부분  UserCard컴포넌트에 이미지 아무거나 넣고 */}
      <BottomNav />
    </div>
  );
}

export default Solo;
