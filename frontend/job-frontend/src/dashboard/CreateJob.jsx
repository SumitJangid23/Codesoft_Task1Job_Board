import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaBriefcase } from "react-icons/fa";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/jobs", {
        ...form,
        experience: Number(form.experience),
        skills: form.skills.split(",").map((s) => s.trim()),
      });

      toast.success("Job created successfully ");

      setForm({
        title: "",
        company: "",
        location: "",
        experience: "",
        skills: "",
      });

    } catch (err) {
      toast.error("Failed to create job ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      {}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
          <FaBriefcase size={20} />
        </div>
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
          Create New Job
        </h2>
      </div>

      
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-xl border border-gray-200 space-y-5"
      >

        
        <div>
          <label className="text-sm font-medium text-gray-600">
            Job Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
        </div>

        
        <div>
          <label className="text-sm font-medium text-gray-600">
            Company Name
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
        </div>

        
        <div>
          <label className="text-sm font-medium text-gray-600">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
        </div>

      
        <div>
          <label className="text-sm font-medium text-gray-600">
            Experience (years)
          </label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 2"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
        </div>

        
        <div>
          <label className="text-sm font-medium text-gray-600">
            Skills (comma separated)
          </label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Create Job "
          )}
        </button>

      </form>
    </div>
  );
}