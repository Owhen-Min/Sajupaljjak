import { Routes, Route } from 'react-router-dom';
import Match from '../pages/match/Match';
import MatchReport from '../pages/match/MatchReport';
import MatchFilter from '../pages/match/MatchFilter';

function MatchRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Match />} />
      <Route path=":partnerId" element={<MatchReport />} />
      <Route path="filter" element={<MatchFilter />} />
    </Routes>
  );
}

export default MatchRoutes;
