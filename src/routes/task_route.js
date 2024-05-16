let express = require("express");
const { createTask, getTasks } = require("../controllers/task_controller");

let taskRoute = express.Router();

taskRoute.post("/create", createTask);
taskRoute.get("/all-tasks", getTasks);

module.exports = { taskRoute };
