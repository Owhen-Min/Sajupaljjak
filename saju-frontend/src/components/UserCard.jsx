import SajuUserBubble from "./SajuUserBubble";
import { Link } from "react-router-dom";
import Heart from "./Heart";

const UserCard = ({ user, disabled, className, ...props }) => {
  return (
    <Link 
      to={disabled ? '#' : `/match/${user.id}`} 
      className={`w-full max-w-sm mx-auto ${
          disabled && 'pointer-events-none'
        } ${className}`} 
      onClick={(e) => disabled && e.preventDefault()}
      {...props}
    >
      <div
        className={`relative w-full aspect-[4/3] rounded-3xl bg-gray-200`}
        style={{
          backgroundImage: user.profileImage ? `url(${user.profileImage})` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-40 p-4 rounded-b-3xl flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <span className="card-title text-white font-bold">
                {user.nickname}
              </span>
              <SajuUserBubble skyElement={user.memberType} />
              <span className="badge text-white">{user.age}세</span>
            </div>
            <div className="flex space-x-2">
              <p className="text-white">{user.introduction  }</p>
            </div>
          </div>
          <Heart score={user.score} />

        </div>
      </div>
    </Link>
  );
};

export default UserCard;
