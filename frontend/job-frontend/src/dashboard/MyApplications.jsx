import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading)
    return (
      <p className="text-gray-500 animate-pulse">
        Loading applications...
      </p>
    );

  return (
    <div>

      {}
      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6">
        My Applications 
      </h2>

      {}
      {applications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No applications yet </p>
          <p className="text-sm">Start applying to jobs!</p>
        </div>
      ) : (

        <div className="grid gap-5">

          {applications.map((app) => {

            const status = app.status || "pending";

            return (
              <div
                key={app._id}
                className="group bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex justify-between items-center"
              >

                {}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {app.job?.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {app.job?.company}
                  </p>
                </div>

                {}
                <span
                  className={`px-4 py-1 text-xs rounded-full font-medium capitalize ${
                    status === "shortlisted"
                      ? "bg-green-100 text-green-600"
                      : status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {status}
                </span>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}