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

module.exports = { createTask };