const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { authMiddleware } = require("../middleware/auth");


router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can create jobs" });
    }

    const { title, company, location, experience, skills } = req.body;

    if (!title || !company || !location || experience === undefined || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = new Job({
      title,
      company,
      location: location.trim().toLowerCase(),
      experience,
      skills,
      createdBy: req.user.userId,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job" });
  }
});


router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const jobs = await Job.find({ createdBy: req.user.userId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load jobs" });
  }
});


router.get("/", async (req, res) => {
  try {
    const { location, experience, skills } = req.query;
    let filter = {};

    if (location) {
      filter.location = { $regex: `^${location.trim()}$`, $options: "i" };
    }

    if (experience) {
      filter.experience = { $gte: Number(experience) };
    }

    if (skills) {
      filter.skills = { $elemMatch: { $regex: skills, $options: "i" } };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load jobs" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
});

module.exports = router;