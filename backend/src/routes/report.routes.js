const express = require("express");
const {
  getPendingWorkReport,
  getLastWeekReport,
  getClosedTasksReport,
} = require("../controllers/report.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for Team
router.get("/last-week", authenticate, getLastWeekReport);
router.get("/pending", authenticate, getPendingWorkReport);
router.get("/closed-tasks", authenticate, getClosedTasksReport);

module.exports = router;
