const Request = require("./model");
const Game = require("../game/model");
const Team = require("../team/model");
// const playerResult = require("../playerResult/model")

exports.createGame = async (req, res) => {
  const team = await Team.findById(req.body.teamId);

  if (!team) {
    return res.status(400).send("Something went wrong");
  }

  const { homeGame, opponent, date, season } = req.body;

  // Create game
  const game = await Game.create({
    myTeam: team._id,
    homeGame,
    opponent,
    date,
    season,
  });

  team.games = [...team.games, game];
  team.save();

  res.status(201).json(game);
};

exports.getSeasonGames = async (req, res) => {
  const game = await Game.find({
    myTeam: req.params.teamId,
    season: req.params.season,
  });

  if (!game) {
    return res.status(404).send("Could not find any games");
  }
  res.status(200).json(game);
};
