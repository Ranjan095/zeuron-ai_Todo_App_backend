let express = require("express");
const { UserModal } = require("../modle/user_model");
const { create_user, login_user } = require("../controllers/user_controller");
const { auth } = require("../middleware/auth");

let userRoute = express.Router();

module.exports = { userRoute };

userRoute.post("/create", create_user);
userRoute.post("/login", login_user);

// app.post
