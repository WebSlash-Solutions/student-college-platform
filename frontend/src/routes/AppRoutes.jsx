import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import CollegeManagement from "../pages/admin/CollegeManagement";

import StudentDashboard from "../pages/student/StudentDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

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

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;