import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import JobList from "../jobs/JobList";
import MyApplications from "../dashboard/MyApplications";
import ResumeUpload from "../resume/ResumeUpload";
import JobSeekerAnalytics from "../analytics/JobSeekerAnalytics";
import NotificationBell from "../components/NotificationBell";
import socket from "../socket";
import {
  FaBriefcase,
  FaFileAlt,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";

export default function JobSeekerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");

  const handleLogout = () => {
    logoutUser();
    socket.disconnect();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">

      {}
      <div className="flex justify-between items-center px-10 py-4 bg-white/60 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
  <FaBriefcase />
  HireHub
</h1>

        <div className="flex items-center gap-6">
          <NotificationBell />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {}
      <div className="flex gap-8 p-8">

        {}
        <div className="w-64 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-4 md:p-6 space-y-4 border border-gray-200">

          <h2 className="text-gray-700 font-semibold mb-4">Dashboard</h2>

          {[
            { name: "jobs", icon: <FaBriefcase />, label: "Jobs" },
            { name: "applications", icon: <FaFileAlt />, label: "Applications" },
            { name: "resume", icon: "📄", label: "Resume" },
            { name: "analytics", icon: <FaChartLine />, label: "Analytics" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg scale-[1.02]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}

        </div>

        {}
        <div className="flex-1 space-y-6">

          {}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-3xl p-4 md:p-6 shadow-xl flex justify-between items-center">

            <div>
             <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">
  <FaUser />
  Welcome Back
</h2>

<p className="text-blue-100 text-sm flex items-center gap-2">
  <FaRocket className="text-sm" />
  Let’s find your dream job today
</p>
            </div>

            <div className="hidden md:block text-5xl opacity-20">
              💼
            </div>

          </div>

          {}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-4 md:p-6 border border-gray-200 transition-all duration-300 hover:shadow-2xl">

            {}
            <div className="animate-fadeIn">
              {activeTab === "jobs" && <JobList />}
              {activeTab === "applications" && <MyApplications />}
              {activeTab === "resume" && <ResumeUpload />}
              {activeTab === "analytics" && <JobSeekerAnalytics />}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}