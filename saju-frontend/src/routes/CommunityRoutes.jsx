import { Routes, Route } from 'react-router-dom';
import Community from '../pages/community/Community';
import CommunityView from '../pages/community/CommunityView';
import CommunityModify from '../pages/community/CommunityModify';
import CommunityWrite from '../pages/community/CommunityWrite';
// import CommunityReport from '../pages/community/CommunityReport';
// import CommunitySearch from '../pages/community/CommunitySearch';

function CommunityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Community/>} />
      <Route path=":postId" element={<CommunityView />} />
      <Route path=":postId/modify" element={<CommunityModify />} />
      {/* <Route path=":postId/report" element={<CommunityReport />} /> */}
      <Route path="write" element={<CommunityWrite />} />
      {/* <Route path="search" element={<CommunitySearch />} /> */}
    </Routes>
  );
}

export default CommunityRoutes;
