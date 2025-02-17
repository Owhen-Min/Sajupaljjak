// TopBar2.jsx
import React from "react";

export default function TopBar3({ mainText }) {
  return (
    <header className="h-12 bg-black text-white flex items-center justify-center">
      {/* mainText가 있으면 가운데 표시 */}
      <div className="text-lg font-bold flex items-center justify-center">
        {mainText || "게시판"}
      </div>
    </header>
  );
}
