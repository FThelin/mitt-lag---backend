const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const GameSchema = new mongoose.Schema({
  myTeam: {
    type: mongoose.Schema.ObjectId,
    ref: ModelName.Team,
    required: true,
  },
  goals: {
    type: Number,
    default: 0,
    required: true,
  },
  homeGame: {
    type: Boolean,
    default: true,
    required: true,
  },
  playerResult: [
    {
      type: mongoose.Schema.ObjectId,
      ref: ModelName.PlayerResult,
      default: [],
    },
  ],
  opponent: {
    type: String,
    required: true,
  },
  opponentGoals: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(ModelName.Game, GameSchema);
