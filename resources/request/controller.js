const Request = require("./model");
const Team = require("../team/model");

exports.createRequest = async (req, res) => {
  const team = await Team.findById(req.params.teamId);

  if (!team) {
    return res.status(400).send("Something went wrong");
  }

  const request = await Request.create({
    player: req.body.player,
    message: req.body.message,
  });

  team.requests = [...team.requests, request];
  team.save();

  res.status(201).json({
    success: true,
  });
};

exports.deleteRequest = async (req, res) => {
  const request = await Request.findByIdAndRemove(req.body.requestId);

  if (!request) {
    return res.status(400).send("Something went wrong");
  }

  res.status(201).json({
    success: true,
  });
};
