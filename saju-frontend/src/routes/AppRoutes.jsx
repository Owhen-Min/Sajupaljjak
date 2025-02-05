import { Routes, Route } from 'react-router-dom';
import Onboarding from '../pages/utils/Onboarding';
import LogInPage from '../pages/utils/Login';
import Welcome from '../pages/signup/Welcome';
import SignUpAdditional from '../pages/signup/SignUpAdditional';
import Preference from '../pages/Preference';
import CoupleInvitation from '../pages/CoupleInvitation';
import SignUpPage from '../pages/signup/SignUp';



// import ProtectedRoutes from './ProtectedRoutes';
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
      <Route path="/main" element={<Onboarding />} />
      {/* 로그인으로 이동하는 경우 */}
      <Route path="/login" element={<LogInPage />} />
      {/* 회원가입으로 이동하는 경우 */}
      <Route path="/signup" element={<SignUpPage />} />
      {/* 회원가입 완료 페이지로 이동하는 경우 (솔로, 커플 추가정보 입력해야 함)*/}
      <Route path="/welcome" element={<Welcome />} />
      {/* 추가정보 입력 페이지로 이동하는 경우 */}
      <Route path="/signup/additional" element={<SignUpAdditional />} />
      {/* 솔로 취향 입력 페이지로 이동하는 경우 */}
      <Route path="/preference" element={<Preference />} />
      {/* 커플 등록 페이지로 이동하는 경우 */}
      <Route path="/coupleinvitation" element={<CoupleInvitation />} />

      
      {/* <Routes element={<ProtectedRoutes />}> */}
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
