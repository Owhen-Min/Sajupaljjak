import { Routes, Route } from 'react-router-dom';
import LogInPage from '../pages/auth/Login';
import Welcome from '../pages/auth/Welcome';
import SignUpAdditional from '../pages/auth/SignUpAdditional';
import Preference from '../pages/auth/Preference';
import CoupleInvitation from '../pages/auth/CoupleInvitation';
import SignUpPage from '../pages/auth/SignUp';
import Verify from '../pages/auth/Verify';

function AuthRoutes() {
  return (
    <Routes>

      {/* 로그인으로 이동하는 경우 */}
      <Route path="/" element={<LogInPage />} />
      {/* 로그인 검증으로 이동하는 경우 */}
      <Route path="/verify" element={<Verify />} />
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
      
    </Routes>
  );
}

export default AuthRoutes;
