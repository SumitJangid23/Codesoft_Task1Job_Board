const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.userId}_${Date.now()}${ext}`);
  },
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});


router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (req.user.role !== "jobseeker") {
        return res
          .status(403)
          .json({ message: "Only jobseekers can upload resume" });
      }

      const user = await User.findById(req.user.userId);
      user.resume = req.file.path;
      await user.save();

      res.json({
        message: "Resume uploaded successfully",
        resume: req.file.path,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Resume upload failed" });
    }
  }
);

module.exports = router;
