const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();



const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


global.io = io;

io.on("connection", (socket) => {
  (" Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    ("User joined room:", userId);
  });

  socket.on("disconnect", () => {
    (" Socket disconnected:", socket.id);
  });
});


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => ("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const resumeRoutes = require("./routes/resume");
const analyticsRoutes = require("./routes/analytics");
const notificationRoutes = require("./routes/notifications");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
  res.send("Backend running with MongoDB + Socket.io");
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  (` Server running on port ${PORT}`);
});
