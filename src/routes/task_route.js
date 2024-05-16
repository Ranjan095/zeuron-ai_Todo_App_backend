let express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task_controller");

let taskRoute = express.Router();

taskRoute.post("/create", createTask);
taskRoute.get("/all-tasks", getTasks);
taskRoute.patch("/update-task", updateTask);
taskRoute.delete("/delete-task", deleteTask);

module.exports = { taskRoute };
