import { useEffect, useState } from "react";
import API from "../api/api";
import {
  FaBriefcase,
  FaLightbulb,
  FaChartBar,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function RecruiterAnalytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/analytics/recruiter")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load recruiter analytics"));
  }, []);

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading analytics...
      </div>
    );

  return (
    <div>

    
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
  <div className="bg-indigo-100 p-3 rounded-xl">
    <FaChartBar className="text-indigo-600 text-lg" />
  </div>
  Recruiter Analytics
</h2>
      </div>

     
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <FaBriefcase size={22} />
            <span className="text-sm opacity-80">Jobs</span>
          </div>
          <h3 className="text-3xl font-bold mt-4">
            {data.totalJobs}
          </h3>
          <p className="text-sm opacity-80">Jobs Posted</p>
        </div>

      
        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <FaUsers size={22} />
            <span className="text-sm opacity-80">Applicants</span>
          </div>
          <h3 className="text-3xl font-bold mt-4">
            {data.totalApplications}
          </h3>
          <p className="text-sm opacity-80">Total Applications</p>
        </div>

        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <FaCheckCircle size={22} />
            <span className="text-sm opacity-80">Selected</span>
          </div>
          <h3 className="text-3xl font-bold mt-4">
            {data.shortlisted}
          </h3>
          <p className="text-sm opacity-80">Shortlisted</p>
        </div>

       
        <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <FaTimesCircle size={22} />
            <span className="text-sm opacity-80">Rejected</span>
          </div>
          <h3 className="text-3xl font-bold mt-4">
            {data.rejected}
          </h3>
          <p className="text-sm opacity-80">Rejected</p>
        </div>

      </div>

      
      <div className="mt-8 bg-white/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
  <FaUsers className="text-indigo-600" />
  Applicants
</h3>

        <p className="text-gray-600 text-sm">
          You have posted{" "}
          <span className="font-semibold">{data.totalJobs}</span> jobs and received{" "}
          <span className="font-semibold">{data.totalApplications}</span> applications.
          Keep optimizing your job descriptions to attract better candidates 
        </p>
      </div>

    </div>
  );
}