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

exports.deleteRequest = async (req, res) => {
  try {
    const team = await Team.findById(req.body.teamId);
    const request = await Request.findByIdAndDelete(req.body.reqId);

    if (!team) {
      return res.status(400).send("Something went wrong with team");
    }

    if (!request) {
      return res.status(400).send("Something went wrong with request");
    }

    const index = team.requests.indexOf(request._id);
    team.requests.splice(index, 1);

    await team.save();

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
