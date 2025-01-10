const Team = require("../models/team.model");

// Add a new team
const addTeam = async (newTeam) => {
  try {
    const teamToSave = new Team(newTeam);
    const savedTeam = await teamToSave.save();
    return savedTeam;
  } catch (error) {
    throw error;
  }
};

exports.createTeam = async (req, res) => {
  const team = req.body;
  try {
    const savedTeam = await addTeam(team);
    if (savedTeam) {
      res.status(201).json({ message: "Team added successfully", savedTeam });
    } else {
      res.status(400).json({ message: "Failed to add team" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add team" });
  }
};

// Read teams
const readTeams = async () => {
  try {
    const teams = await Team.find();
    return teams;
  } catch (error) {
    throw error;
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await readTeams();
    if (teams.length > 0) {
      res.status(200).json({ message: "Teams fetched successfully", teams });
    } else {
      res.status(404).json({ message: "Failed to fetch teams" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};
