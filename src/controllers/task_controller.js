const { TaskModal } = require("../modle/task_model");

// for create all tasks
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

// for get all tasks
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

// for update task
let updateTask = async (req, res) => {
  try {
    let { taskId } = req.query;
    let { title, description, category, priority, status, deadline } = req.body;
    // console.log(taskId);

    if (!taskId) {
      return res.status(404).send({ error: "taskId is not found" });
    }

    let newTask = await TaskModal.findByIdAndUpdate(
      { _id: taskId },
      {
        title,
        description,
        category,
        priority,
        deadline,
        status,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Task updated successfully", updatedTask: newTask });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

// for delete task
let deleteTask = async (req, res) => {
  try {
    let { taskId } = req.query;

    if (!taskId) {
      return res.status(404).send({ error: "taskId is not found" });
    }

    let deleteTask = await TaskModal.findByIdAndDelete({ _id: taskId });

    if (!deleteTask) {
      return res.status(404).send({ error: "taskId is invalid " });
    }

    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
module.exports = { createTask, getTasks, updateTask, deleteTask };
