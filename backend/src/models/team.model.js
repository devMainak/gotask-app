const mongoose = require("mongoose");

// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Team names must be unique
  description: { type: String }, // Optional description for the team
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
