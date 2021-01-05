const Team = require("./model");
const User = require("../user/model");
const Request = require("../request/model");

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

exports.getTeam = async (req, res) => {
  const team = await await Team.findById(req.params.id)
    .populate("players")
    .populate("leaders")
    .populate("requests");

  if (!team) {
    return res.status(404).send("");
  }

  res.status(200).json(team);
};

exports.deletePlayerFromTeam = async (req, res) => {
  const team = await Team.findById(req.body.teamId);

  if (!team) {
    return res.status(404).send("No team found");
  }

  const player = await team.players.find((p) => p == req.body.userId);

  if (!player) {
    return res.status(404).send("No player found");
  }

  const index = team.players.indexOf(player);
  team.players.splice(index, 1);

  await team.save();

  res.status(200).json({
    success: true,
    data: team.players,
  });
};

exports.deleteLeaderFromTeam = async (req, res) => {
  const team = await Team.findById(req.body.teamId);

  if (!team) {
    return res.status(404).send("No team found");
  }

  const player = await team.leaders.find((p) => p == req.body.userId);

  if (!player) {
    return res.status(404).send("No player found");
  }

  const index = team.leaders.indexOf(player);
  team.leaders.splice(index, 1);

  await team.save();

  res.status(200).json({
    success: true,
    data: team.players,
  });
};

exports.acceptRequest = async (req, res) => {
  const team = await Team.findById(req.body.teamId);
  const request = await Request.findById(req.body.requestId);
  const user = await User.findById(request.player);

  if (!team) {
    return res.status(400).send("Something went wrong with team");
  }

  if (!request) {
    return res.status(400).send("Something went wrong with request");
  }
  if (!user) {
    return res.status(400).send("Something went wrong with user");
  }

  user.team = [...user.team, team._id];

  const index = team.requests.indexOf(request._id);
  team.requests.splice(index, 1);

  team.players = [...team.players, request.player];

  team.save();
  user.save();
  request.remove();
  res.status(201).json({
    success: true,
  });
};
