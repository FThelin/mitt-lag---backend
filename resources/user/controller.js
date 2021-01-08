const bcrypt = require("bcrypt");
const User = require("./model");

//Register new user
exports.register = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json(err);
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
