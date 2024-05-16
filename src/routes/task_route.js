let express = require("express");

let taskRoute = express.Router();

taskRoute.get("/", async (req, res) => {
  try {
    return res.status(200).send({
      message: "all tasks are available",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { taskRoute };
