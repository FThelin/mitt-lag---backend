const Game = require("../game/model");
const User = require("../user/model");
const PlayerResult = require("../playerResult/model");

exports.getPlayerResult = async (req, res) => {
  const playerResult = await Game.findById(req.params.gameId).populate(
    "playerResult"
  );

  if (!playerResult) {
    return res.status(404).send("");
  }

  res.status(200).json(playerResult.playerResult);
};

exports.addPlayerResult = async (req, res) => {
  const game = await Game.findById(req.body.gameId);
  const player = await User.findById(req.body.userId);

  if (!game) {
    return res.status(400).send("Something went wrong with game");
  }
  if (!player) {
    return res.status(400).send("Something went wrong with player");
  }

  const { userId, goals, assists, penalties } = req.body;

  const initial = player.firstname.charAt(0).toUpperCase();

  // Create player result
  const playerResult = await PlayerResult.create({
    playerId: userId,
    playerName: `${initial}.${player.lastname}`,
    goals,
    assists,
    penalties,
  });

  game.playerResult = [...game.playerResult, playerResult];
  game.save();

  res.status(201).json(playerResult);
};

// Delete player result
exports.deletePlayerResult = async (req, res) => {
  const playerResult = await PlayerResult.findByIdAndDelete(
    req.params.playerResultId
  );
  const game = await Game.findById(req.params.gameId);

  if (!playerResult) {
    return res.status(400).send("Something went wrong with playerResult");
  }
  if (!game) {
    return res.status(400).send("Something went wrong game");
  }

  const index = game.playerResult.indexOf(playerResult._id);
  game.playerResult.splice(index, 1);

  await game.save();

  res.status(200).json({
    success: true,
  });
};
