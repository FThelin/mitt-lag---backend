const bcrypt = require("bcrypt");
const User = require("./model");
const errorMessage = require("../../utils/errorHandler");

//Register new user
exports.register = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      res.status(400).json({ password: "too short(min 6 chars)" });
    } else {
      const { firstname, lastname, email } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);

      // Create user
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
      });
      res.status(201).json(user);
    }
  } catch (err) {
    const errorObject = {};

    if (err.code === 11000 || 11001 === err.code) {
      errorObject["email"] = "duplicate";
    }
    if (err.name === "ValidationError") {
      Object.values(err.errors).forEach((val) => {
        errorObject[val.path] = val.kind;
      });
    }

    res.status(400).json(errorObject);
  }
};

exports.getUserTeams = async (req, res) => {
  const user = await User.findById(req.params.userId).populate({
    path: "team",
    select: ["name", "city", "sport"],
  });

  if (!user) {
    res.status(400).json("No users found");
  }

  res.status(200).json(user.team);
};
