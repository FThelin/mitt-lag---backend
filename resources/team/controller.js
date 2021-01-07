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
  const team = await Team.findById(req.params.id)
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
  const user = await User.findById(req.body.userId);

  if (!team) {
    return res.status(404).send("No team found");
  }

  if (!user) {
    return res.status(404).send("No player found");
  }

  //Remove player from team
  const index = team.players.indexOf(user._id);
  team.players.splice(index, 1);

  //Remove team from user
  const userIndex = user.team.indexOf(team._id);
  user.team.splice(userIndex, 1);

  if (user.activeTeam.toString() == team._id.toString()) {
    if (user.team.length === 0) {
      user.activeTeam = undefined;
    } else if (user.team.length > 0) {
      user.activeTeam = user.team[0];
    }
  }

  await team.save();
  await user.save();

  res.status(200).json({
    success: true,
    data: team.players,
  });
};

exports.deleteLeaderFromTeam = async (req, res) => {
  const team = await Team.findById(req.body.teamId);
  const user = await User.findById(req.body.userId);

  if (!team) {
    return res.status(404).send("No team found");
  }

  if (!user) {
    return res.status(404).send("No player found");
  }

  //Remove player from team
  const index = team.leaders.indexOf(user._id);
  team.leaders.splice(index, 1);

  //Remove team from user
  const userIndex = user.team.indexOf(team._id);
  user.team.splice(userIndex, 1);

  if (user.activeTeam.toString() == team._id.toString()) {
    if (user.team.length === 0) {
      user.activeTeam = undefined;
    } else if (user.team.length > 0) {
      user.activeTeam = user.team[0];
    }
  }

  await team.save();
  await user.save();

  res.status(200).json({
    success: true,
    data: team.players,
  });
};

exports.teamRole = async (req, res) => {
  const team = await Team.findById(req.body.teamId);
  const userId = req.body.userId;

  if (!team) {
    return res.status(400).send("Something went wrong with team");
  }

  const isLeader = team.leaders.find((l) => l == userId);
  const isPlayer = team.players.find((l) => l == userId);

  if (isLeader) {
    team.players = [...team.players, userId];
    const index = team.leaders.indexOf(userId);
    team.leaders.splice(index, 1);
  } else if (isPlayer) {
    team.leaders = [...team.leaders, userId];
    const index = team.players.indexOf(userId);
    team.players.splice(index, 1);
  } else {
    return res.status(400).send("Something went wrong with team");
  }

  await team.save();

  res.status(201).json({
    success: true,
  });
};

exports.acceptRequest = async (req, res) => {
  const team = await Team.findById(req.body.teamId);
  const request = await Request.findById(req.body.requestId);
  const user = await User.findById(request.playerId);

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

  //If user does not have an active team already, assign this team as active.
  if (!user.hasOwnProperty("activeTeam")) {
    user.activeTeam = team._id;
  }

  const index = team.requests.indexOf(request._id);
  team.requests.splice(index, 1);

  team.players = [...team.players, request.playerId];

  await team.save();
  await user.save();
  request.remove();
  res.status(201).json({
    success: true,
  });
};

exports.changeTeam = async (req, res) => {
  const user = await User.findById(req.body.userId);
  const teamId = req.body.teamId;
  if (!user) {
    return res.status(400).send("Something went wrong with user");
  }

  user.activeTeam = teamId;

  await user.save();

  res.status(201).json({
    success: true,
  });
};
