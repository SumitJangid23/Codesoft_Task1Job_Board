import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaTools, 
  FaSearch, 
  FaCheckCircle 
} from "react-icons/fa";
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [applyingId, setApplyingId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(saved);
  }, []);

  const applyJob = async (jobId) => {
    try {
      setApplyingId(jobId);

      await API.post(`/applications/${jobId}`);

      setAppliedJobs((prev) => {
        const updated = [...prev, jobId];
        localStorage.setItem("appliedJobs", JSON.stringify(updated));
        return updated;
      });

      toast.success("Applied successfully");

    } catch {
      toast.error("Already applied");
    } finally {
      setApplyingId(null);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs", {
        params: { location, experience, skills },
      });
      setJobs(res.data);
      setError("");
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>

      {}
      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaBriefcase className="text-indigo-600" />
        Available Jobs
      </h2>

      {}
      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow mb-6 flex flex-wrap gap-3 border border-gray-200">

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="number"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          placeholder="Skill"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          onClick={fetchJobs}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition flex items-center gap-2"
        >
          <FaSearch />
          Search
        </button>

      </div>

      {}
      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No jobs found</p>
          <p className="text-sm">Try different filters</p>
        </div>
      )}

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {jobs.map((job) => {
          const isApplied = appliedJobs.includes(job._id);

          return (
            <div
              key={job._id}
              className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-4 md:p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >

              {}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {job.company} • {job.location}
                  </p>
                </div>

                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              {}
              <div className="flex flex-wrap gap-2 mt-4">

                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 text-xs rounded-full">
                  <FaBriefcase />
                  {job.experience} yrs
                </span>

                <span className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 text-xs rounded-full">
                  <FaTools />
                  {job.skills.join(", ")}
                </span>

              </div>

              {}
              <p className="text-gray-600 text-sm mt-4 line-clamp-2">
                {job.description || "Exciting opportunity to grow your career"}
              </p>

              {}
              <div className="flex justify-between items-center mt-6">

                <button
                  onClick={() => navigate(`/job/${job._id}`)}
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  View Details →
                </button>

                <button
                  onClick={() => applyJob(job._id)}
                  disabled={applyingId === job._id || isApplied}
                  className={`px-5 py-2 rounded-xl font-medium transition flex items-center gap-2
                    ${
                      isApplied
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:scale-105"
                    }
                  `}
                >
                  {applyingId === job._id ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : isApplied ? (
                    <>
                      <FaCheckCircle />
                      Applied
                    </>
                  ) : (
                    "Apply"
                  )}
                </button>

              </div>

              {}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 pointer-events-none"></div>

            </div>
          );
        })}

      </div>
    </div>
  );
}