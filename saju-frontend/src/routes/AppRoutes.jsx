import { Routes, Route } from 'react-router-dom';
import Onboarding from '../pages/utils/Onboarding';

import Login from '../pages/auth/Login';
// import ProtectedRoutes from './ProtectedRoutes';
import Auth from './AuthRoutes';
import Solo from '../pages/solo/Solo';
import ChatsRoutes from './ChatsRoutes';
import CommunityRoutes from './CommunityRoutes';
import CoupleRoutes from './CoupleRoutes';
import FortuneRoutes from './FortuneRoutes';
import MatchRoutes from './MatchRoutes';
import MyPageRoutes from './MyPageRoutes';

import Error from '../pages/utils/Error';

function AppRoutes() {
  return (
    <Routes>

      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Login />} />
      
      {/* <Routes element={<ProtectedRoutes />}> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/solo" element={<Solo />} />
      <Route path="/chats/*" element={<ChatsRoutes />} />
      <Route path="/community/*" element={<CommunityRoutes />} />
      <Route path="/couple/*" element={<CoupleRoutes />} />
      <Route path="/fortune/*" element={<FortuneRoutes />} />
      <Route path="/match/*" element={<MatchRoutes />} />
      <Route path="/mypage/*" element={<MyPageRoutes />} />

  
      {/* 404 페이지 */}
      <Route path="*" element={<Error />} />

      
    </Routes>
  );
}

export default AppRoutes;
