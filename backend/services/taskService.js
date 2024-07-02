const Task = require("../models/taskModel");

exports.getTasks = async () => {
  return await Task.find();
};

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

exports.getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

exports.updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

exports.deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};
