import { Routes, Route } from 'react-router-dom';
import Couple from '../pages/couple/Couple';
import CoupleFortuneToday from '../pages/couple/CoupleFortuneToday';
import CoupleFortuneYear from '../pages/couple/CoupleFortuneYear';
import CoupleCompatibility from '../pages/couple/CoupleCompatibility';
import CoupleFortunePartner from '../pages/couple/CoupleFortunePartner';
import CoupleCode from '../pages/couple/CoupleCode';

function CoupleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Couple />} />
      <Route path="/code" element={<CoupleCode />} />
      <Route path="today" element={<CoupleFortuneToday />} />
      <Route path="year" element={<CoupleFortuneYear />} />
      <Route path="compatibility" element={<CoupleCompatibility />} />
      <Route path="partner" element={<CoupleFortunePartner />} />
    </Routes>
  );
}

export default CoupleRoutes;
