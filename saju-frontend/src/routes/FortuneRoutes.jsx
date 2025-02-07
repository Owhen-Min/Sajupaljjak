import { Routes, Route } from 'react-router-dom';
import Fortune from '../pages/fortune/Fortune';
import FortuneToday from '../pages/fortune/FortuneToday';
import FortuneYear from '../pages/fortune/FortuneYear';
import FortuneLife from '../pages/fortune/FortuneLife';
import FortuneMy from '../pages/fortune/FortuneMy';

function FortuneRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Fortune />} />
      <Route path="today" element={<FortuneToday />} />
      <Route path="year" element={<FortuneYear />} />
      <Route path="life" element={<FortuneLife />} />
      <Route path="my" element={<FortuneMy />} />
    </Routes>
  );
}

export default FortuneRoutes;
