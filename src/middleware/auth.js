let auth = async (req, res, next) => {
  let data=req.body;
  console.log(data)
  next();
};

module.exports = { auth };
