const express = require("express");
const {
  getProjects,
  createProject,
} = require("../controllers/project.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for Team
router.get("/", authenticate, getProjects);
router.post("/", authenticate, createProject);

module.exports = router;
