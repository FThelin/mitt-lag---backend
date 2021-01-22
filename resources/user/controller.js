const bcrypt = require("bcrypt");
const User = require("./model");
const errorHandler = require("../../utils/errorHandler");

//Register new user
exports.register = async (req, res) => {
  try {
    const errorMsg = errorHandler.errorMessageRegister(req.body);
    if (!errorMsg) {
      const password = await bcrypt.hash(req.body.password, 10);
      const { firstname, lastname, email } = req.body;

      // Create user
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
      });
      res.status(201).json(user);
    } else {
      res.status(400).json(errorMsg);
    }
  } catch (err) {
    let errorMsg = "";

    if (err.code === 11000 || 11001 === err.code) {
      errorMsg = "Email finns redan";
    }
    res.status(400).json(errorMsg);
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
