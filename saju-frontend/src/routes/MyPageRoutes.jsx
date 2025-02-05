import { Routes, Route } from 'react-router-dom';
import MyPage from '../pages/mypage/MyPage';
import MyPageEditProfile from '../pages/mypage/MyPageEditProfile';
import MyPageEditSaju from '../pages/mypage/MyPageEditSaju';
import MyPageLiked from '../pages/mypage/MyPageLiked';
import MyPagePosts from '../pages/mypage/MyPagePosts';
import MyPageComments from '../pages/mypage/MyPageComments';
import MyPageEditCouple from '../pages/mypage/MyPageEditCouple';

function MyPageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyPage />} />
      <Route path="edit-profile" element={<MyPageEditProfile />} />
      <Route path="edit-saju" element={<MyPageEditSaju />} />
      <Route path="liked" element={<MyPageLiked />} />
      <Route path="posts" element={<MyPagePosts />} />
      <Route path="comments" element={<MyPageComments />} />
      <Route path="edit-couple" element={<MyPageEditCouple />} />
    </Routes>
  );
}

export default MyPageRoutes;
