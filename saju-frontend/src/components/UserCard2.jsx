// UserCard2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard2({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer opacity-90 hover:opacity-100 transition"
      onClick={() => navigate(`/match/${user.id}`)}
    >
      <div className="relative w-full aspect-square">
        <img
          src={user.profileImage}
          alt={user.nickname}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-left">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {user.nickname}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
          <span>점수: {user.score}</span>
          <span>|</span>
          <span>나이: {user.age}</span>
        </div>
        <p className="text-sm text-gray-600">지역: {user.region}</p>
        <p className="text-sm text-gray-600 mb-2">천간: {user.memberType}</p>
        <p className="text-sm text-gray-600 italic mb-4">{user.introduction}</p>
      </div>
    </div>
  );
}
