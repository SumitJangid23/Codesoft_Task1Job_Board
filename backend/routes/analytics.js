const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { authMiddleware } = require("../middleware/auth");
const Job = require("../models/Job");
router.get("/jobseeker", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.user.userId;

    const totalApplied = await Application.countDocuments({
      applicant: userId,
    });

    const shortlisted = await Application.countDocuments({
      applicant: userId,
      status: "shortlisted",
    });

    const rejected = await Application.countDocuments({
      applicant: userId,
      status: "rejected",
    });

    const pending = await Application.countDocuments({
      applicant: userId,
      status: "applied",
    });

    res.json({
      totalApplied,
      shortlisted,
      rejected,
      pending,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analytics failed" });
  }
});
router.get("/recruiter", authMiddleware, async (req, res) => {
  try {
    
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    
    const jobs = await Job.find({ createdBy: req.user.userId });
    const jobIds = jobs.map(job => job._id);

 
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const shortlisted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "shortlisted",
    });

    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "rejected",
    });

    res.json({
      totalJobs: jobs.length,
      totalApplications,
      shortlisted,
      rejected,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load recruiter analytics" });
  }
});


module.exports = router;
