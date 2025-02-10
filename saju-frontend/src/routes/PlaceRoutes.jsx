import { Routes, Route } from 'react-router-dom';
import Place from '../pages/place/Place';
import PlaceReport from '../pages/place/PlaceReport';

function PlaceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Place/>} />
      <Route path=":placeId" element={<PlaceReport />} />
    </Routes>
  );
}

export default PlaceRoutes;
