import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDashboard from "../pages/admin/Applications";
import AdminDashboard from "../pages/admin/CourseManagement";
import StudentManagement from "../pages/admin/StudentManagement";
import CollegeManagement from "../pages/admin/CollegeManagement";
import Transactions from "../pages/admin/Transactions";
import Reportsanalytics from "../pages/admin/Reportsanalytics";
import Users from "../pages/admin/Users";
import Users from "../pages/admin/Settings";



// STUDENT
import StudentDashboard from "../pages/student/StudentDashboard";

// COLLEGE
import CollegeDashboard from "../pages/college/CollegeDashboard";
import CollegeProfile from "../pages/college/CollegeProfile";
import CollegeSite from "../pages/college/CollegeSite";
import Registeration from "../pages/college/Registeration";
import CollegePayment from "../pages/college/CollegePayment";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/coursemanagement" element={<CourseManagement />} />
        <Route path="/admin/student-management" element={<StudentManagement />} />
        <Route path="/admin/college-management" element={<CollegeManagement />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="/admin/reports" element={<Reportsanalytics />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/colleges" element={<StudentDashboard />} />
        <Route path="/student/about" element={<StudentDashboard />} />

        {/* COLLEGE */}
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/college/profile" element={<CollegeProfile />} />
        <Route path="/college/registration" element={<Registeration />} />
        <Route path="/college/collegesite" element={<CollegeSite />} />
        <Route path="/college/payment" element={<CollegePayment />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;