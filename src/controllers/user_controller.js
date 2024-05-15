const { UserModal } = require("../modle/user_model");
require("dotenv").config();
let bcrypt = require("bcryptjs");
let create_user = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let hash = bcrypt.hashSync(password, 10);

    if (!hash) {
      return res
        .status(404)
        .send({ message: "Somthing went wrong while hasing password" });
    }
    let user = await UserModal.create({ name, email, password: hash });
    user.save();
    return res.status(200).json({
      data: { name, email },
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

let login_user = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "your emai is invalid" });
    }

    let isPassworCorrect = bcrypt.compareSync(password, user.password);

    if (!isPassworCorrect) {
      return res.status(400).send({ error: "Oops! your password is invalied" });
    }

    return res.status(200).send({
      message: `Welcome ${user.name} you'r logged in successfully`,
    });
  } catch (error) {
    return res.status(404).send(error);
  }
};
module.exports = { create_user, login_user };
