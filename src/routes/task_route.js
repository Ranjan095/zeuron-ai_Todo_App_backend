let express = require("express");
const { createTask } = require("../controllers/task_controller");

let taskRoute = express.Router();

taskRoute.post("/create", createTask);

module.exports = { taskRoute };
