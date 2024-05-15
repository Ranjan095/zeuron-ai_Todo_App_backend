let mongoose = require("mongoose");

let connection = () => {
  mongoose.connect(process.env.MONGO_URL);
};

module.exports = { connection };
