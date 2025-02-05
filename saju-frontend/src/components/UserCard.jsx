import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/match/${user.id}`}>
      <div
        className="card relative w-96 h-80 cursor-pointer rounded-3xl"
        style={{
          backgroundImage: `url(${user.profileImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        
        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-60 p-4 rounded-b-3xl">
          <h2 className="card-title text-white">
            {user.name}{" "}
            <span className="text-sm text-gray-300">({user.nickname})</span>
          </h2>
          <div className="badge badge-secondary">{user.memberType}</div>
          <p className="text-white mt-2">{user.introduction}</p>
          <div className="card-actions justify-end mt-2">
            <div className="badge badge-outline text-white">
              Score: {user.score}
            </div>
            <div className="badge badge-outline text-white">
              Age: {user.age}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
