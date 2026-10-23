import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CollegeDashboard from "../pages/college/CollegeDashboard";
import CollegeProfile from "../pages/college/CollegeProfile";
import CollegeRegistration from "../pages/college/Registeration";
import CollegeSite from "../pages/college/CollegeSite";
import CollegePayment from "./pages/college/CollegePayment";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/college/home" replace />} />
        <Route path="/college/home" element={<CollegeSite />} />
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/college/profile" element={<CollegeProfile />} />
        <Route path="/college/registration" element={<CollegeRegistration />} />
        <Route path="/college/payment" element={<CollegePayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;