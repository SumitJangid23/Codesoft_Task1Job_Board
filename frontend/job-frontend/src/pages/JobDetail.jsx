import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function JobDetail() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  
  useEffect(() => {
    API.get(`/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(() => ("Error loading job"))
      .finally(() => setLoading(false));
  }, [id]);

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (saved.includes(id)) {
      setIsApplied(true);
    }
  }, [id]);

  
  const applyJob = async () => {
    try {
      setApplying(true);

      await API.post(`/applications/${id}`);

      setIsApplied(true);

    
      const saved = JSON.parse(localStorage.getItem("appliedJobs")) || [];
      const updated = [...saved, id];
      localStorage.setItem("appliedJobs", JSON.stringify(updated));

      toast.success("Applied successfully ");

    } catch {
      toast.error("Already applied ");
    } finally {
      setApplying(false);
    }
  };

  
  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading job details...
      </div>
    );

  
  if (!job)
    return (
      <div className="text-center mt-20 text-red-500">
        Job not found 
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4 md:p-6">

      <div className="max-w-4xl mx-auto">

        {}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-8 rounded-3xl shadow-xl">

          <h1 className="text-3xl font-bold">{job.title}</h1>

          <p className="mt-2 text-blue-100">
            {job.company} • {job.location}
          </p>

          <div className="mt-4 flex flex-col md:flex-row gap-3 flex-wrap">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
               {job.experience} yrs
            </span>

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {job.location}
            </span>
          </div>
        </div>

        {}
        <div className="bg-white/70 backdrop-blur-xl mt-6 p-4 md:p-6 rounded-3xl shadow border border-gray-200">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Job Description
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {job.description || "No description provided."}
          </p>

          {}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-600 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {}
        <div className="mt-6 flex justify-center">

          <button
            onClick={applyJob}
            disabled={applying || isApplied}
            className={`px-4 md:px-8 py-3 rounded-2xl font-semibold shadow-lg transition flex items-center gap-2
              ${
                isApplied
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:scale-105"
              }
            `}
          >
            {applying ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : isApplied ? (
              "Applied "
            ) : (
              "Apply Now "
            )}
          </button>

        </div>

      </div>
    </div>
  );
}