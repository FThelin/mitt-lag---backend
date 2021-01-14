const Game = require("../game/model");
const PlayerResult = require("../playerResult/model");

exports.addPlayerResult = async (req, res) => {
  const game = await Game.findById(req.body.gameId);

  if (!game) {
    return res.status(400).send("Something went wrong");
  }

  const { userId, goals, assists, penalties } = req.body;

  // Create player result
  const playerResult = await PlayerResult.create({
    player: userId,
    goals,
    assists,
    penalties,
  });

  game.playerResult = [...game.playerResult, playerResult];
  game.save();

  res.status(201).json(game);
};
