import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<h1>Welcome to Student College Platform</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />

        {/* Student */}
        <Route
          path="/student"
          element={<h1>Student Dashboard</h1>}
        />

        {/* College */}
        <Route
          path="/college"
          element={<h1>College Dashboard</h1>}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={<h1>Admin Dashboard</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;