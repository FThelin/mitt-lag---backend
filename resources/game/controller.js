const Request = require("./model");
const Game = require("../game/model");
const Team = require("../team/model");
// const playerResult = require("../playerResult/model")

exports.createGame = async (req, res) => {
  const team = await Team.findById(req.body.teamId);

  if (!team) {
    return res.status(400).send("Something went wrong");
  }

  const { homeGame, goals, opponentGoals, opponent, date, season } = req.body;

  // Create game
  const game = await Game.create({
    myTeam: team._id,
    homeGame,
    goals,
    opponentGoals,
    opponent,
    date,
    season,
  });

  team.games = [...team.games, game];
  team.save();

  res.status(201).json(game);
};

exports.updateGame = async (req, res) => {
  const { homeGame, goals, opponentGoals, opponent, date, season } = req.body;

  // Create game
  const gameObj = {
    homeGame,
    goals,
    opponentGoals,
    opponent,
    date,
    season,
  };
  const game = await Game.findByIdAndUpdate(req.body.gameId, gameObj);
  if (!game) {
    return res.status(400).send("Something went wrong");
  }
  await game.save();
  res.status(201).json(game);
};

exports.deleteGame = async (req, res) => {
  const game = await Game.findByIdAndDelete(req.params.gameId);
  const team = await Team.findById(req.params.teamId);

  if (!game) {
    return res.status(400).send("Something went wrong");
  }
  if (!team) {
    return res.status(400).send("Something went wrong");
  }

  const index = team.games.indexOf(game._id);
  team.games.splice(index, 1);

  await team.save();

  res.status(200).json({
    success: true,
  });
};

exports.getGames = async (req, res) => {
  const game = await Game.find({
    myTeam: req.params.teamId,
  });

  if (!game) {
    return res.status(404).send("Could not find any games");
  }
  res.status(200).json(game);
};
