// TopBar.jsx
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function TopBar5({ name }) {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">{name}</h1>
      <div
        className="absolute left-4 text-xl cursor-pointer text-white "
        onClick={() => navigate("/community")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}
