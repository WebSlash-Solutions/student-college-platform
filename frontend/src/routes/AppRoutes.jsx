import { BrowserRouter, Routes, Route } from "react-router-dom";

// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import CollegeManagement from "../pages/admin/CollegeManagement";

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

        {/* COLLEGE */}
        <Route
          path="/college/dashboard"
          element={<CollegeDashboard />}
        />
        <Route
          path="/college/profile"
          element={<CollegeProfile />}
        />
        <Route
          path="/college/registration"
          element={<CollegeRegistration />}
        />
        <Route
          path="/college/registration"
          element={<CollegeSite />}
        />
   
      </Routes>
      
    </BrowserRouter>
  );
}

export default AppRoutes;
