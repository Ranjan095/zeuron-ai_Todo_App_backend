let express = require("express");
let mongoose = require("mongoose");
const { connection } = require("./db");
const { UserModal } = require("./modle/user_model");
const { userRoute } = require("./routes/userRoutes");
let PORT = process.env.PORT || 8080;
require("dotenv").config();
let app = express();
app.use(express.json());

// console.log(express)

app.get("/", (req, res) => {
  res.send("<h1>Hello Ranjan </h1>");
});

app.use("/user", userRoute);

app.listen(PORT, async () => {
  try {
    connection();
    console.log("Db has been connected ");
    console.log("server is running on port" + PORT);
  } catch (error) {
    console.log(error);
  }
});
