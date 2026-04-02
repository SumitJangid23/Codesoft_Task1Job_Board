const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Notification = require("../models/Notification");
const Job = require("../models/Job");
const User = require("../models/User"); 
const { authMiddleware } = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail");


router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only job seekers allowed" });
    }

    const applications = await Application.find({
      applicant: req.user.userId,
    }).populate("job");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});


router.get("/job/:jobId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email resume")
      .populate("job", "title company");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});


router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only job seekers can apply" });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.userId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = new Application({
      job: req.params.jobId,
      applicant: req.user.userId,
    });

    await application.save();

    
    const user = await User.findById(req.user.userId);

    
    await sendEmail(
      user.email,
      "Application Submitted",
      `Hello ${user.name},\n\nYou have successfully applied for a job.\n\nBest of luck!\nJob Portal Team`
    );

    ("Email sent to:", user.email);

    
    const job = await Job.findById(req.params.jobId);

    await Notification.create({
      user: job.createdBy,
      message: `New application received for "${job.title}"`,
      link: "/recruiter",
    });

    
    global.io.to(job.createdBy.toString()).emit("notification", {
      message: `New application received for "${job.title}"`,
    });

    res.json({ message: "Application submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Application failed" });
  }
});


router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const { status } = req.body;
    const allowedStatuses = ["applied", "shortlisted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    await Notification.create({
      user: application.applicant,
      message: `Your application has been ${status}`,
      link: "/applications",
    });

    
    global.io.to(application.applicant.toString()).emit("notification", {
      message: `Your application has been ${status}`,
    });

    res.json({
      message: "Application status updated",
      status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update application status" });
  }
});

module.exports = router;