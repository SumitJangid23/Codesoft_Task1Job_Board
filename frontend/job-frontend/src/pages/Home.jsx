import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import { FaBriefcase, FaRocket, FaChartLine } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  API.get("/jobs")
    .then(res => {
      console.log("Jobs API:", res.data); 

      const jobData = Array.isArray(res.data)
        ? res.data
        : res.data.jobs || [];

      setJobs(jobData.slice(0, 4));
    })
    .catch(() => console.log("Error loading jobs"));
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {}
      <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h2 className="text-lg md:text-2xl font-bold text-blue-600 flex items-center gap-2">
          HireHub
          <FaRocket className="text-blue-500 animate-bounce" />
        </h2>

        
      </div>

      {}
      <div className="grid md:grid-cols-2 gap-10 items-center px-10 py-20">

        {}
        <div className="space-y-6 animate-[fadeIn_1s_ease-in-out]">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight flex items-center gap-3">
            Build Your Career With Confidence
            <FaRocket className="text-blue-500 hover:scale-125 transition" />
          </h1>

          <p className="text-gray-600 text-lg">
            Discover jobs that match your skills, apply instantly and grow faster with smart hiring.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Create Account
            </button>
          </div>
        </div>

        {}
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex justify-center gap-10 text-blue-600 text-lg font-semibold hover:scale-105 transition duration-300 animate-[float_4s_ease-in-out_infinite]">

          <div className="flex flex-col items-center gap-2">
            <FaBriefcase size={28} />
            Jobs
          </div>

          <div className="flex flex-col items-center gap-2">
            <FaChartLine size={28} />
            Growth
          </div>

        </div>
      </div>

      {}
      <div className="px-10 pb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Latest Opportunities
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map(job => (
            <div
              key={job._id}
              className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h3>

              <p className="text-gray-500 mt-1">
                {job.company} • {job.location}
              </p>

              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <FaBriefcase className="text-gray-500" />
                {job.experience} yrs experience
              </p>

              <button
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token) {
                    alert("Please login first");
                    navigate("/login");
                    return;
                  }

                  navigate(`/job/${job._id}`);
                }}
                className="mt-5 inline-block text-blue-600 font-medium hover:underline"
              >
                Explore →
              </button>
            </div>
          ))}
        </div>
      </div>

      {}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

    </div>
  );
}