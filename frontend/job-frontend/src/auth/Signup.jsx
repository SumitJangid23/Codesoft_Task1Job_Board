import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { FaUser } from "react-icons/fa";
import { FaRocket, FaBriefcase, FaBolt, FaChartLine } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("jobseeker");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { name, email, password, role });
      alert("Account created successfully!");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">

  <h1 className="text-5xl font-bold mb-6 flex items-center gap-3">
    Join HireHub
    <FaRocket className="text-blue-200" />
  </h1>

  <p className="text-lg text-blue-100 mb-10">
    Create your account and unlock endless career opportunities.
  </p>

  <div className="space-y-4 text-blue-100">

    <div className="flex items-center gap-3">
      <FaBriefcase className="text-blue-200" />
      <span>Apply to top companies</span>
    </div>

    <div className="flex items-center gap-3">
      <FaBolt className="text-blue-200" />
      <span>Real-time notifications</span>
    </div>

    <div className="flex items-center gap-3">
      <FaChartLine className="text-blue-200" />
      <span>Track your growth</span>
    </div>

  </div>

</div>

      
      <div className="flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
  <FaUserPlus className="text-indigo-600" />
  Create Account
</h2>

          <p className="text-gray-500 mb-6">
            Sign up to get started
          </p>

         
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole("jobseeker")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                role === "jobseeker"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Job Seeker
            </button>

            <button
              onClick={() => setRole("recruiter")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                role === "recruiter"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Recruiter
            </button>
          </div>

          
          <form onSubmit={handleSignup} className="space-y-4">

            <div>
              <label className="text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:scale-[1.02] transition"
            >
              Register as {role}
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}