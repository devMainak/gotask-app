const mongoose = require("mongoose");

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Refers to Team model
  owners: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true }, // Refers to User model (owners)
  ],
  priority: {
    type: String,
    enum: ["High", "Low", "Medium"],
    default: "Low",
  },
  tags: [{ type: String }],
  timeToComplete: { type: Number, required: true },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"],
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
