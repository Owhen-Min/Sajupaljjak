import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card relative w-96 h-80 cursor-pointer rounded-3xl"
      style={{
        backgroundImage: `url(${user.profileImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-20 pl-4 pt-1 rounded-b-3xl">
        <span className="card-title text-white">{user.nickname}</span>
        {"       "}
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{user.memberType}</span>
        {"       "}
        <span className="badge badge-outline text-white">{user.age}세</span>
     
        <p className="text-white mt-2">{user.introduction}</p>
        <div className="card-actions justify-end mt-2">
        {/*  거주지랑 점수 같은것도 추가 */}
          
        </div>
      </div>
    </div>
  );
};

export default UserCard;
