const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const PlayerResultSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.ObjectId,
    ref: ModelName.User,
    required: true,
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
