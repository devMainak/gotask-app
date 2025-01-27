const Project = require("../models/project.model");

// Function to add a new project
const addProject = async (newProject) => {
  try {
    const projectToSave = new Project(newProject);
    const savedProject = await projectToSave.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
};

exports.createProject = async (req, res) => {
  const project = req.body;
  try {
    const savedProject = await addProject(project);
    if (savedProject) {
      res
        .status(201)
        .json({ message: "Project added successfully", savedProject });
    } else {
      res.status(400).json({ message: "Failed to add project" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add project" });
  }
};

// Read all projects
const readProjects = async () => {
  try {
    const projects = await Project.find();
    return projects;
  } catch (error) {
    throw error;
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await readProjects();
    if (projects.length > 0) {
      res
        .status(200)
        .json({ message: "Projects fetched successfully", projects });
    } else {
      res.status(400).json({ message: "Failed to fetch projects" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get projects" });
  }
};
