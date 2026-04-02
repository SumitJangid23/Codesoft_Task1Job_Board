import { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../socket";
import { FaBell, FaCheck } from "react-icons/fa";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
 
    API.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => setError("Failed to load notifications"));

    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (userId) {
      socket.emit("join", userId);
    }

    const handleNotification = (data) => {
      setNotifications((prev) => [
        {
          message: data.message,
          isRead: false,
          createdAt: new Date(),
        },
        ...prev,
      ]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4 md:p-6">

      <div className="max-w-3xl mx-auto">

        {}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <FaBell />
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Notifications
          </h2>
        </div>

        {}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {}
        {notifications.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No notifications available
          </div>
        ) : (

          <div className="space-y-4">

            {notifications.map((n) => (
              <div
                key={n._id}
                className={`flex justify-between items-center p-4 rounded-2xl border shadow-sm transition hover:shadow-md
                  ${
                    n.isRead
                      ? "bg-white text-gray-600"
                      : "bg-blue-50 border-blue-200"
                  }
                `}
              >

                {}
                <div>
                  <p className="text-sm font-medium">
                    {n.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>

                {}
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                  >
                    <FaCheck /> Mark Read
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}