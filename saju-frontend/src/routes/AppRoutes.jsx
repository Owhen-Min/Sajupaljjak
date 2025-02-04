import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Onboarding from '../pages/utils/Onboarding';
import LogInPage from '../pages/utils/Login';
import Welcome from '../pages/signup/Welcome';
import SignUpPreference from '../pages/signup/SignUpPreference';
import SignUpAdditional from '../pages/signup/SignUpAdditional';
import SignUpCouple from '../pages/signup/SignUpCouple';
import SignUpPage from '../pages/signup/SignUp';
import Solo from '../pages/solo/Solo';
import Chats from '../pages/chats/Chats';
import Community from '../pages/community/Community';
import Fortune from '../pages/fortune/Fortune';
import Match from '../pages/solo/Match';
import Error from '../pages/utils/error';
import Couple from '../pages/couple/Couple';
import MyPage from '../pages/mypage/MyPage';

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Onboarding />} />
      
      {/* 로그인으로 이동하는 경우 */}
      <Route path="/login" element={<LogInPage />} />
      {/* 회원가입으로 이동하는 경우 */}
      <Route path="/signup" element={<SignUpPage />} />
      {/* 회원가입 완료 페이지로 이동하는 경우 (솔로, 커플 추가정보 입력해야 함)*/}
      <Route path="/welcome" element={<Welcome />} />
      {/* 추가정보 입력 페이지로 이동하는 경우 */}
      <Route path="/signup/additional" element={<SignUpAdditional />} />
      {/* 솔로 취향 입력 페이지로 이동하는 경우 */}
      <Route path="/signup/preference" element={<SignUpPreference />} />
      {/* 커플 등록 페이지로 이동하는 경우 */}
      <Route path="/signup/couple" element={<SignUpCouple />} />
      {/* 커뮤니티 페이지로 이동하는 경우 */}
      <Route path="/community" element={<Community />} />
      {/* 운세 페이지로 이동하는 경우 */}
      <Route path="/fortune" element={<Fortune />} />

      <Route path="/solo" element={<Solo />} />
      <Route path="/couple" element={<Couple />} />
      
      <Route path="/chats" element={<Chats />} />
      <Route path="/match" element={<Match />} />
      <Route path="/mypage" element={<MyPage />} />

      {/* 404 페이지 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
