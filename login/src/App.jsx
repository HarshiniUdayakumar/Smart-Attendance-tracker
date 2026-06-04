import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffDashboard from "./pages/StaffDashboard";
import HMDashboard from "./pages/HMDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/hm" element={<HMDashboard />} />
    </Routes>
  );
}

export default App;