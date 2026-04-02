import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { FaRocket, FaBolt, FaBullseye, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("jobseeker");

  
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful");

      if (res.data.role === "jobseeker") {
        navigate("/jobseeker");
      } else {
        navigate("/recruiter");
      }

    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  
  const handleForgotPassword = async () => {
    try {
      await API.post("/auth/forgot-password", { email: resetEmail });

      toast.success("If email exists, reset link sent");
      setShowForgot(false);
      setResetEmail("");

    } catch {
      toast.error("Email not found");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <h1 className="text-5xl font-bold mb-6">
          JobNest <span className="text-blue-200">AI</span>
        </h1>

        <p className="text-xl mb-10 text-blue-100">
          Find your perfect job match with AI-powered recommendations.
        </p>

        <div className="space-y-4 text-blue-100">

          <div className="flex items-center gap-3">
            <FaRocket />
            Smart Job Matching
          </div>

          <div className="flex items-center gap-3">
            <FaBolt />
            Real-time Updates
          </div>

          <div className="flex items-center gap-3">
            <FaBullseye />
            One-click Apply
          </div>

        </div>
      </div>

    
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <FaUser className="text-indigo-500" />
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Sign in to access your dashboard
          </p>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole("jobseeker")}
              className={`flex-1 py-2 rounded-md ${
                role === "jobseeker"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Job Seeker
            </button>

            <button
              onClick={() => setRole("recruiter")}
              className={`flex-1 py-2 rounded-md ${
                role === "recruiter"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Recruiter
            </button>
          </div>

         
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Sign In
            </button>

          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>

    
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-80">

            <h3 className="text-lg font-semibold mb-2">
              Reset Password
            </h3>

            <input
              type="email"
              placeholder="Enter email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForgot(false)}>
                Cancel
              </button>

              <button
                onClick={handleForgotPassword}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}