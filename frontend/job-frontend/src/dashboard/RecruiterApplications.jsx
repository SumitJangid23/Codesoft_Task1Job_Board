import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import {
  FaUser,
  FaUsers,
  FaFileAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function RecruiterApplications() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

 
  const updateStatus = async (applicationId, status) => {
    try {
      await API.patch(`/applications/${applicationId}/status`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );

      toast.success(`Marked as ${status} ✅`);
    } catch {
      toast.error("Failed to update ");
    }
  };

 
  useEffect(() => {
    API.get("/jobs/my")
      .then((res) => setJobs(res.data))
      .catch(() => setError("Failed to load jobs"));
  }, []);


  useEffect(() => {
    if (!selectedJobId) return;

    API.get(`/applications/job/${selectedJobId}`)
      .then((res) => setApplications(res.data))
      .catch(() => setError("Failed to load applications"));
  }, [selectedJobId]);

  return (
    <div>

      {}
     <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
  <FaUsers className="text-indigo-600" />
  Applicants
</h3>

      {}
      <div className="mb-6">
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Select Job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {}
      {applications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No applications found 
        </div>
      ) : (

        <div className="grid gap-5">

          {applications.map((app) => {

            const status = app.status || "applied";

            return (
              <div
                key={app._id}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all flex justify-between items-center"
              >

                {}
                <div className="flex items-center gap-4">

                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                    <FaUser />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {app.applicant.email}
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize
                        ${
                          status === "shortlisted"
                            ? "bg-green-100 text-green-600"
                            : status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }
                      `}
                    >
                      {status}
                    </span>
                  </div>

                </div>

                {}
                <div className="flex items-center gap-3">

                  {}
                  {app.applicant.resume ? (
                    <a
                      href={`http://localhost:5000/${app.applicant.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                    >
                      <FaFileAlt /> Resume
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      No Resume
                    </span>
                  )}

                  {}
                  {status === "applied" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(app._id, "shortlisted")
                        }
                        className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-1"
                      >
                        <FaCheck /> Shortlist
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app._id, "rejected")
                        }
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}