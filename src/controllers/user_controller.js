const { UserModal } = require("../modle/user_model");
require("dotenv").config();
let bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

/** for create user */
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

/** for login user */
let login_user = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Your email is invalid" });
    }

    let isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({ error: "Oops! Your password is invalid" });
    }

    let token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.SECRET_TOKEN
    );

    if (!token) {
      return res
        .status(400)
        .send({ error: "Oops something went wrong while creating JWT" });
    }

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Set to true if your app uses HTTPS
        sameSite: "None", // Use "None" for cross-site cookies
      })
      .send({
        message: `Welcome ${user.name}, you're logged in successfully`,
        token,
      });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { create_user, login_user };
