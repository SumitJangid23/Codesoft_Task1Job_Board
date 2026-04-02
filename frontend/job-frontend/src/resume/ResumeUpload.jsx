import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaFileAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF resume ");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume uploaded successfully ");
      setFile(null);

    } catch (err) {
      toast.error("Failed to upload resume ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-4 md:p-6 shadow-xl max-w-lg">

      {}
      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
  <FaFileAlt className="text-indigo-500" />
  Upload Resume
</h3>

      {}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-2xl p-4 md:p-6 cursor-pointer hover:bg-indigo-50 transition">

        <span className="text-indigo-500 text-sm font-medium">
          Click or drag your resume here
        </span>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />

        {file && (
          <p className="mt-3 text-sm text-gray-600">
            📎 {file.name}
          </p>
        )}
      </label>

      {}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Upload Resume "
        )}
      </button>

    </div>
  );
}