export default function UserCard({ user }) {
  return (
    <div className="w-72 h-72 shadow-xl rounded-xl font-nanumNeo">
      {/* 이미지 박스 -> 여기에 텍스트 정보가 포함 되어야함 */}
      <div className="w-60 h-60 relative">
        <div>
          <img src={user.profileImage} className="rounded-t-xl" />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent text-white p-4">
        <div className="text-lg font-semibold ">{user.nickname}</div>
        <div className="text-sm opacity-90">
          {user.age}세 · {user.celestialStem}
        </div>
        <div className="text-xs mt-2 opacity-80 ">{user.introduction}</div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-around rounded-b-xl h-[3rem] items-center w-full">
        <div className="text-xl pt-1 bg-green-700 hover:bg-green-600 rounded-bl-xl w-[50%] h-full flex items-center justify-center">
          채팅하기
        </div>
        <div className=" text-xl pt-1 bg-red-700 hover:bg-red-600 w-[50%] rounded-br-xl h-full flex items-center justify-center">
          화상채팅
        </div>
      </div>
    </div>
  );
}
