import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import socket from "../socket";
import { FaBell } from "react-icons/fa";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    API.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => ("Failed to load notifications"));

   
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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = async () => {
    try {
      await API.patch("/notifications/read-all");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch {
      ("Failed to mark read");
    }
  };

  const toggleDropdown = async () => {
    setOpen(!open);

    if (!open && unreadCount > 0) {
      await markAllRead();
    }
  };

  return (
    <div className="relative">

      
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaBell className="text-xl text-gray-700" />

       
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

     
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50">

      
          <div className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
            Notifications
          </div>

         
          <div className="max-h-80 overflow-y-auto">

            {notifications.length === 0 ? (
              <p className="p-4 text-gray-400 text-center">
                No notifications
              </p>
            ) : (
              notifications.slice(0, 6).map((n, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 text-sm border-b transition hover:bg-gray-50
                    ${
                      !n.isRead
                        ? "bg-blue-50 text-gray-800"
                        : "text-gray-600"
                    }
                  `}
                >
                  {n.message}
                </div>
              ))
            )}

          </div>

        
          <div className="p-3 text-center">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              View all notifications
            </button>
          </div>

        </div>
      )}
    </div>
  );
}