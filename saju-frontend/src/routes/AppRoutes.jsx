import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LogInPage from '../pages/login';
import SignUpPage from '../pages/Signup';

// 나중에 추가될 다른 페이지들을 위한 임시 컴포넌트들
const SignUp = () => <div>커플 등록 페이지</div>;
const Single = () => <div>싱글 상태 페이지</div>;
const Couple = () => <div>커플 상태 페이지</div>;

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Home />} />
      
      {/* 로그인 상태에 따른 라우트들 */}
      <Route path="/login" element={<LogInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/single" element={<Single />} />
      <Route path="/couple" element={<Couple />} />
      
      {/* 404 페이지 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default AppRoutes;
