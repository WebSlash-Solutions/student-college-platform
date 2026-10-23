import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import CollegeManagement from "../pages/admin/CollegeManagement";
import Transactions from "../pages/admin/Transactions";
import Reportsanalytics from "../pages/admin/Reportsanalytics";

// STUDENT
import StudentDashboard from "../pages/student/StudentDashboard";

// COLLEGE
import CollegeDashboard from "../pages/college/CollegeDashboard";
import CollegeProfile from "../pages/college/CollegeProfile";
import CollegeRegistration from "../pages/college/Registeration";
import CollegeSite from "../pages/college/CollegeSite";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/student-management" element={<StudentManagement />} />
        <Route path="/admin/college-management" element={<CollegeManagement />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="/admin/reports" element={<Reportsanalytics />} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/colleges" element={<StudentDashboard />} />
        <Route path="/student/about" element={<StudentDashboard />} />

        {/* COLLEGE */}
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/college/profile" element={<CollegeProfile />} />
        <Route path="/college/registration" element={<CollegeRegistration />} />
        <Route path="/college/registration" element={<CollegeSite />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;