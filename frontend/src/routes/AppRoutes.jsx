import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
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

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/student-management"
          element={<StudentManagement />}
        />

        <Route
          path="/admin/college-management"
          element={<CollegeManagement />}
        />

        <Route
          path="/admin/courses"
          element={<CourseManagement />}
        />

        <Route
          path="/admin/applications"
          element={<Applications />}
        />

        <Route
          path="/admin/transactions"
          element={<Transactions />}
        />

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
