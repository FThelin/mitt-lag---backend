const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const PlayerResultSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.ObjectId,
    ref: ModelName.User,
    required: true,
  },
  playerName: {
    type: String,
  },
  goals: {
    type: Number,
  },
  assists: {
    type: Number,
  },
  penalties: {
    type: Number,
  },
});

module.exports = mongoose.model(ModelName.PlayerResult, PlayerResultSchema);
