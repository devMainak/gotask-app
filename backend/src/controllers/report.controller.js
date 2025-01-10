const Task = require("../models/task.model");

// Utility to calculate the date n days ago
const getDateNDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// GET /report/last-week - Fetch tasks completed in the last week
exports.getLastWeekReport = async (req, res) => {
  try {
    const lastWeekDate = getDateNDaysAgo(7);
    const tasks = await Task.find({
      status: "Completed",
      updatedAt: { $gte: lastWeekDate },
    });

    res.status(200).json({
      message: "Tasks completed in the last week fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching last week report:", error);
    res.status(500).json({ message: "Failed to fetch last week report" });
  }
};

// GET /report/pending - Fetch total days of work pending for all tasks
exports.getPendingWorkReport = async (req, res) => {
  try {
    const tasks = await Task.find({ status: { $ne: "Completed" } });

    const totalPendingDays = tasks.reduce((sum, task) => {
      return sum + (task.timeToComplete || 0); // Assuming timeToComplete is in days
    }, 0);

    res.status(200).json({
      message: "Total pending work fetched successfully",
      totalPendingDays,
    });
  } catch (error) {
    console.error("Error fetching pending work report:", error);
    res.status(500).json({ message: "Failed to fetch pending work report" });
  }
};

// GET /report/closed-tasks - Fetch the number of tasks closed by team, owner, or project
exports.getClosedTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Completed" });

    const reportByTeam = tasks.reduce((acc, task) => {
      acc[task.team] = (acc[task.team] || 0) + 1;
      return acc;
    }, {});

    const reportByOwner = tasks.reduce((acc, task) => {
      acc[task.owner] = (acc[task.owner] || 0) + 1;
      return acc;
    }, {});

    const reportByProject = tasks.reduce((acc, task) => {
      acc[task.project] = (acc[task.project] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      message: "Closed tasks report fetched successfully",
      report: {
        byTeam: reportByTeam,
        byOwner: reportByOwner,
        byProject: reportByProject,
      },
    });
  } catch (error) {
    console.error("Error fetching closed tasks report:", error);
    res.status(500).json({ message: "Failed to fetch closed tasks report" });
  }
};
