export default function UserCard({ user }) {
  return (
    <div className="font-main1 relative w-64 h-64 shadow-xl rounded-xl  bg-gradient-to-t from-black/60 via-black/60 to-transparent">
      {/* 이미지 박스 -> 여기에 텍스트 정보가 포함 되어야함 */}
      <div className="w-60 h-60">
        <div>
          <img src={user.profileImage} className="rounded-t-xl" />
        </div>
      </div>
      <div className="absolute bottom-0 rounded-b-xl w-full bg-gradient-to-t from-black via-black/90 to-transparent text-white p-4">
        <div className="text-lg font-extrabold">{user.nickname}</div>
        <div className="text-sm opacity-90">
          {user.age}세 · {user.celestialStem}
        </div>
        <div className="text-xs opacity-80 ">{user.introduction}</div>
        <div className="flex justify-around rounded-b-xl items-center w-full mt-2">
          <div className="text-sm py-1 bg-[#fb4949c1] rounded-xl w-[45%] h-[80%] flex items-center justify-center">
            채팅하기
          </div>
          <div className=" text-sm py-1 bg-[#fb4949c1] w-[45%] rounded-xl h-[80%] flex items-center justify-center">
            화상채팅
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
    </div>
  );
}
