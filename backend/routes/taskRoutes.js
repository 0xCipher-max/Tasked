const express = require("express");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
