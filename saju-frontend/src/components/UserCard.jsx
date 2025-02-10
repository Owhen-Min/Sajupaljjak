import SajuUserBubble from "./SajuUserBubble";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/match/${user.id}`}>
      <div
        className="relative w-80 max-w-sm aspect-[4/3] cursor-pointer rounded-3xl"
        style={{
          backgroundImage: `url(${user.profileImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-40 pl-4 pt-2 rounded-b-3xl">
          <SajuUserBubble 
            skyElement={user.memberType} 
            className="ml-2"
          />
          <span className="card-title text-white font-bold"> {user.nickname}</span>
          <span className="badge text-white ml-2">{user.age}세</span>
          <p className="text-white mt-2">{user.introduction}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
