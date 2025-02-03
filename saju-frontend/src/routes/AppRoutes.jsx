import { Routes, Route } from 'react-router-dom';
import Onboarding from '../pages/SignUp/Onboarding';
import LogInPage from '../pages/login';
import SignUpPage from '../pages/SignUp/SignUp';
import Welcome from '../pages/SignUp/Welcome';
import SignUpPreference from '../pages/SignUp/SignUpPreference';
import SignUpAdditional from '../pages/SignUp/SignUpAdditional';
import SignUpCouple from '../pages/SignUp/SignUpCouple';

// 나중에 추가될 다른 페이지들을 위한 임시 컴포넌트들
const Solo = () => <div>싱글 상태 페이지</div>;
const Couple = () => <div>커플 상태 페이지</div>;
const Community = () => <div>커뮤니티 페이지</div>;
const Fortune = () => <div>운세 페이지</div>;

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Onboarding />} />
      
      {/* 로그인으로 이동하는 경우 */}
      <Route path="/login" element={<LogInPage />} />
      {/* 회원가입으로 이동하는 경우 */}
      <Route path="/sign-up" element={<SignUpPage />} />
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

      {/* 404 페이지 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default AppRoutes;
