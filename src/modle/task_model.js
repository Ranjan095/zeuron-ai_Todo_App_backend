let mongoose = require("mongoose");

let taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["work", "study", "helth", "travel"],
    },
    priority: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    deadline: {
      type: Date,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

let TaskModal = mongoose.model("tasks", taskSchema);

module.exports = { TaskModal };
