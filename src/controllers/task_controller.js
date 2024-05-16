const { TaskModal } = require("../modle/task_model");

let createTask = async (req, res) => {
  try {
    let { title, description, category, priority, deadline } = req.body;

    if (!title || !description || !category) {
      return res.status(404).send({
        error: "invalid credentials",
      });
    }

    let task = await TaskModal.create({
      title,
      description,
      category,
      priority,
      deadline,
      owner: req?.user?._id,
    });

    task.save();

    console.log(task);
    return res
      .status(200)
      .send({ message: "task created successfully", data: task });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

let getTasks = async (req, res) => {
  try {
    let tasks = await TaskModal.find({ owner: req?.user?._id });
    if (!tasks) {
      return res.status(404).send({
        error: "there is no task available",
      });
    }

    return res.status(200).send({
      data: tasks,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { createTask, getTasks };
