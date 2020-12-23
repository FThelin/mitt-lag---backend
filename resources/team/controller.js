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
