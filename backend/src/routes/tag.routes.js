const express = require("express");
const { getTags, createTag } = require("../controllers/tag.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for Team
router.get("/", authenticate, getTags);
router.post("/", authenticate, createTag);

module.exports = router;
