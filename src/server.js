let express = require("express");
let mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const { connection } = require("./db");
const { UserModal } = require("./modle/user_model");
const { userRoute } = require("./routes/userRoutes");
const { taskRoute } = require("./routes/task_route");
const { authantication } = require("./middleware/auth");

let PORT = process.env.PORT || 8080;
require("dotenv").config();
let app = express();
app.use(cors("*"));
app.use(cookieParser());
app.use(express.json());

// console.log(express)

app.get("/", (req, res) => {
  res.send("<h1>Hello Ranjan </h1>");
});

app.use("/user", userRoute);
app.use("/tasks", authantication, taskRoute);

app.listen(PORT, async () => {
  try {
    connection();
    console.log("Db has been connected ");
    console.log("server is running on port" + PORT);
  } catch (error) {
    console.log(error);
  }
});
