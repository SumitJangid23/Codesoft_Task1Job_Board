import { useEffect, useState } from "react";
import API from "../api/api";
import { FaChartBar,FaLightbulb } from "react-icons/fa";
export default function JobSeekerAnalytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/analytics/jobseeker")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load analytics ❌"));
  }, []);

  if (error)
    return <p className="text-red-500 text-center">{error}</p>;

  if (!data)
    return (
      <p className="text-gray-500 animate-pulse text-center">
        Loading analytics...
      </p>
    );

  return (
    <div>

      {}
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
  <FaChartBar className="text-indigo-600" />
  Analytics Dashboard
</h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 md:p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h4 className="text-sm opacity-90">Total Applied</h4>
          <p className="text-3xl font-bold mt-2">
            {data.totalApplied || 0}
          </p>
        </div>

        {}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 md:p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h4 className="text-sm opacity-90">Shortlisted</h4>
          <p className="text-3xl font-bold mt-2">
            {data.shortlisted || 0}
          </p>
        </div>

        {}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-4 md:p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h4 className="text-sm opacity-90">Rejected</h4>
          <p className="text-3xl font-bold mt-2">
            {data.rejected || 0}
          </p>
        </div>

        {}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 md:p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h4 className="text-sm opacity-90">Pending</h4>
          <p className="text-3xl font-bold mt-2">
            {data.pending || 0}
          </p>
        </div>

      </div>

      {}
      <div className="mt-8 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 md:p-6 shadow">
       <h3 className="font-semibold text-gray-700 flex items-center gap-2">
  <FaLightbulb className="text-yellow-500" />
  Insights
</h3>

        <p className="text-gray-600 text-sm">
          You have applied to{" "}
          <span className="font-semibold">
            {data.totalApplied || 0}
          </span>{" "}
          jobs. Keep applying to increase your chances 
        </p>
      </div>

    </div>
  );
}