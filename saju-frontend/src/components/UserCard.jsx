import React from "react";
import { Link } from "react-router-dom";
import Heart from "./Heart";

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
        <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-40 p-4 rounded-b-3xl flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <span className="card-title text-white font-bold">
                {user.nickname}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                {user.memberType}
              </span>
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
