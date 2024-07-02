const TaskService = require("../services/taskService");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = await TaskService.createTask({ title, description, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  try {
    const task = await TaskService.updateTask(req.params.id, {
      title,
      description,
      dueDate,
      completed,
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await TaskService.deleteTask(req.params.id);
    if (task) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
