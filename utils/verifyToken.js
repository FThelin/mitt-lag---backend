const jwt = require("jsonwebtoken");
const User = require("../resources/user/model");

exports.verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from header
    [, token] = req.headers.authorization.split(" ");
  }

  //Add next?
  if (!token) {
    return next(res.status(401).json("Not authorized"));
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id);
    return next();
  } catch (err) {
    return next(res.status(400).send("invalid token"));
  }
};
