import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./App.css";

function App() {
  return (
  <Router>
    <ScrollToTop />
    <AppRoutes />
  </Router>
  );

}

export default App;
