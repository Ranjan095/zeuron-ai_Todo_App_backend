const jwt = require("jsonwebtoken");
const { UserModal } = require("../modle/user_model");

let authantication = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    // console.log(data);
    if (!token) {
      return res.status(404).send({
        error: "please Login first",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    // console.log(decoded);

    if (!decoded) {
      return res.status(404).send({ error: "invalid JWT" });
    }

    let user = await UserModal.findOne({ _id: decoded.userId }).select(
      "-password"
    );
    // console.log(user);

    if (!user) {
      return res.status(404).send({ error: "invalid token!" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).send({
      errror: error.message,
    });
  }
};

module.exports = { authantication };
