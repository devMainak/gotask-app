// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Function to initialize database connection
const initializeDatabase = require("./config/db.connection");

const app = express();

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON Requests
app.use(cookieParser());

// Initialize database
initializeDatabase();

// Importing routes files
app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));
app.use("/teams", require("./routes/team.routes"));
app.use("/projects", require("./routes/project.routes"));
app.use("/tags", require("./routes/tag.routes"));
app.use("/report", require("./routes/report.routes"));

// Exporting the app module
module.exports = app;
