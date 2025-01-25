import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

// 나중에 추가될 다른 페이지들을 위한 임시 컴포넌트들
const Login = () => <div>로그인 페이지</div>;
const CoupleRegistration = () => <div>커플 등록 페이지</div>;
const Dashboard = () => <div>대시보드 페이지</div>;

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Home />} />
      
      {/* 로그인 상태에 따른 라우트들 */}
      <Route path="/login" element={<Login />} />
      <Route path="/couple-registration" element={<CoupleRegistration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* 404 페이지 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default AppRoutes;
