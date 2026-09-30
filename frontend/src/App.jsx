import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./pages/student/StudentDashboard";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        {/* College */}
        <Route
          path="/college/dashboard"
          element={<CollegeDashboard />}
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Default */}
        <Route
          path="/"
          element={<StudentDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;