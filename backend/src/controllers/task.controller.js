const Task = require("../models/task.model");

// Create a new task
const addTask = async (newTask) => {
  try {
    const taskToSave = new Task(newTask);
    const savedTask = await taskToSave.save();
    const task = savedTask.populate("owners")
    return task;
  } catch (error) {
    throw error;
  }
};

exports.createTask = async (req, res) => {
  const { task } = req.body;

  try {
    const savedTask = await addTask(task);
    if (savedTask) {
      res.status(201).json({ message: "Task added successfully", savedTask });
    } else {
      res.status(400).json({ message: "Failed to add task" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

// read all the tasks
const readAllTasks = async (filters) => {
  try {
    // Build the query object based on provided filters
    const query = {};
    if (filters.team) query.team = filters.team;
    if (filters.owner) query.owner = filters.owner;
    if (filters.tags) query.tags = { $in: filters.tags.split(",") }; // Handle tags as a comma-separated list
    if (filters.project) query.project = filters.project;
    if (filters.status) query.status = filters.status;

    const tasks = await Task.find(query).populate("owners");
    return tasks;
  } catch (error) {
    throw error;
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await readAllTasks(req.query);
    if (tasks.length > 0) {
      res.status(200).json({ message: "Tasks fetched successfully.", tasks });
    } else {
      res.status(404).json({ message: "No tasks found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// Function to update task by Id
const updateTaskById = async (taskId, task) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, task, {
      new: true,
    });
    const renewedTask = updatedTask.populate("owners");
    return renewedTask;
  } catch (error) {
    throw error;
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = req.body;
  try {
    const updatedTask = await updateTaskById(taskId, task);
    if (updatedTask) {
      res
        .status(200)
        .json({ message: "Task updated successfully", updatedTask });
    } else {
      res.status(404).json({ message: "No such task found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load task." });
  }
};

// Delete task by id
const deleteTaskById = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    throw error;
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const deletedTask = deleteTaskById(taskId);
    if (deletedTask) {
      res
        .status(200)
        .json({ message: "Task deleted successfully", deletedTask });
    } else {
      res.status(404).json({ message: "Failed to delete task" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
