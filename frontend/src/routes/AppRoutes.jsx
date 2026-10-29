import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import InstitutionDashboard from "../pages/admin/InstitutionDashboard.jsx";
import StudentManagement from "../pages/admin/StudentManagement.jsx";
import CollegeManagement from "../pages/admin/CollegeManagement.jsx";
import CourseManagement from "../pages/admin/CourseManagement.jsx";
import Applications from "../pages/admin/Applications.jsx";
import Transactions from "../pages/admin/Transactions.jsx";
import Reportsanalytics from "../pages/admin/Reportsanalytics.jsx";
import Settings from "../pages/admin/Settings.jsx";
import Users from "../pages/admin/Users.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Institution Dashboard */}
        <Route
          path="/admin/institution-dashboard"
          element={<InstitutionDashboard />}
        />

        {/* Student Management */}
        <Route
          path="/admin/student-management"
          element={<StudentManagement />}
        />

        {/* College Management */}
        <Route
          path="/admin/college-management"
          element={<CollegeManagement />}
        />

        {/* Course Management */}
        <Route
          path="/admin/courses"
          element={<CourseManagement />}
        />

        {/* Applications */}
        <Route
          path="/admin/applications"
          element={<Applications />}
        />

        {/* Transactions */}
        <Route
          path="/admin/transactions"
          element={<Transactions />}
        />

        {/* Reports */}
        <Route
          path="/admin/reports"
          element={<Reportsanalytics />}
        />

        {/* Users */}
        <Route
          path="/admin/users"
          element={<Users />}
        />

        {/* Settings */}
        <Route
          path="/admin/settings"
          element={<Settings />}
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
