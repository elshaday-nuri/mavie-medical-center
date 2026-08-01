import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname === "/dashboard";

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/appointment"
          element={<Appointment />}
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;