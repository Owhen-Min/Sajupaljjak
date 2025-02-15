// UserCard.js
import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
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
        <p className="text-sm text-gray-600 mb-2">천간: {user.celestialStem}</p>
        <p className="text-sm text-gray-600 italic mb-4">{user.introduction}</p>
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-[#d32f2f] to-[#e53935] text-white px-4 py-2 rounded-full text-sm shadow-md hover:opacity-90 active:scale-95 transition">
            채팅하기
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#d32f2f] to-[#e53935] text-white px-4 py-2 rounded-full text-sm shadow-md hover:opacity-90 active:scale-95 transition">
            화상채팅
          </button>
        </div>
      </div>
    </div>
  );
}
