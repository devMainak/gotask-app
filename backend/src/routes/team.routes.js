const express = require("express");
const { getTeams, createTeam } = require("../controllers/team.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for Team
router.get("/", authenticate, getTeams);
router.post("/", authenticate, createTeam);

module.exports = router;
