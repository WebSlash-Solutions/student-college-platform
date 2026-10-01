import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./pages/student/StudentDashboard";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
<<<<<<< HEAD
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>School College Platform</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
=======
    <BrowserRouter>
      <Routes>
>>>>>>> develop

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