import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";

function Place() {
  
  return (
    <div>
      <TopBar />
      
      <h1>장소</h1>

      <BottomNav />

    </div>  );
}

export default Place;
