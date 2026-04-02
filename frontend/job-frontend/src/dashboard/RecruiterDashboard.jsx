import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJob from "./CreateJob";
import RecruiterApplications from "./RecruiterApplications";
import RecruiterAnalytics from "../analytics/RecruiterAnalytics";
import NotificationBell from "../components/NotificationBell";
import socket from "../socket";

import {
  FaPlusCircle,
  FaUserTie,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    socket.disconnect();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {}
      <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-indigo-600">
          HireHub Recruiter 
        </h1>

        <div className="flex items-center gap-6">
          <NotificationBell />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">

        {}
        <div className="bg-white rounded-2xl shadow p-5 space-y-4 h-fit">

          <h2 className="font-semibold text-gray-700 mb-2">
            Recruiter Panel
          </h2>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
              activeTab === "jobs"
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            <FaPlusCircle /> Create Job
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
              activeTab === "applications"
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            <FaUsers /> Applicants
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
              activeTab === "analytics"
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            <FaChartLine /> Analytics
          </button>

        </div>

        {}
        <div className="md:col-span-3 space-y-6">

          {}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 md:p-6 rounded-2xl shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">
  <FaUserTie />
  Welcome Recruiter
</h2>
              <p className="text-sm text-blue-100">
                Manage jobs and applicants efficiently
              </p>
            </div>
          </div>

          {}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-4 md:p-6">

            {activeTab === "jobs" && <CreateJob />}

            {activeTab === "applications" && (
              <RecruiterApplications />
            )}

            {activeTab === "analytics" && <RecruiterAnalytics />}

          </div>

        </div>

      </div>
    </div>
  );
}