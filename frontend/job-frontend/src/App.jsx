import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import JobSeekerDashboard from "./dashboard/JobSeekerDashboard";
import RecruiterDashboard from "./dashboard/RecruiterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./notifications/Notifications";
import JobDetail from "./pages/JobDetail";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";
<Toaster position="top-right" />



function App() {
  return (
    <Routes>

      {}
      <Route path="/" element={<Home />} />

      {}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
      {}
      <Route
        path="/job/:id"
        element={
          <ProtectedRoute role="jobseeker">
            <JobDetail />
          </ProtectedRoute>
        }
      />

      {}
      <Route
        path="/jobseeker"
        element={
          <ProtectedRoute role="jobseeker">
            <JobSeekerDashboard />
          </ProtectedRoute>
        }
      />

      {}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      {}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {}
      <Route path="/" element={<Home />} />

    </Routes>
  );
}

export default App;