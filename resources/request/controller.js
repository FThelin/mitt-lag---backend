const Request = require("./model");
const Team = require("../team/model");
const User = require("../user/model");

exports.createRequest = async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  const user = await User.findById(req.body.player);

  if (!team) {
    return res.status(400).send("Something went wrong");
  }

  const request = await Request.create({
    player: user.firstname + " " + user.lastname,
    message: req.body.message,
  });

  team.requests = [...team.requests, request];
  team.save();

  res.status(201).json({
    success: true,
  });
};

//Ta bort en request
exports.deleteRequest = async (req, res) => {
  const request = await Request.findByIdAndRemove(req.body.requestId);

  if (!request) {
    return res.status(400).send("Something went wrong");
  }

  res.status(201).json({
    success: true,
  });
};
