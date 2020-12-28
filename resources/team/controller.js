const Team = require("./model");
const User = require("../user/model");

exports.createTeam = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(400).send("Something went wrong");
  }

  const { name, city, sport } = req.body;

  // Create team
  const team = await Team.create({
    name,
    city,
    sport,
    leaders: [req.user._id],
  });

  user.activeTeam = team._id;
  user.team = [...user.team, team._id];
  user.save();

  res.status(201).json(team);
};

exports.findTeam = async (req, res) => {
  req.params.query = req.params.query.replace("&", " ");

  const team = await Team.find({
    name: { $regex: req.params.query, $options: "i" },
  });

  if (!team) {
    return res.status(404).send("");
  }

  res.status(200).json(team);
};
