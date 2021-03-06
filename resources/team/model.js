const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  games: {
    type: [mongoose.Schema.ObjectId],
    ref: ModelName.Game,
    default: [],
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.User,
      default: [],
    },
  ],
  leaders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.User,
      default: [],
    },
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.Request,
      default: [],
    },
  ],
});

module.exports = mongoose.model(ModelName.Team, TeamSchema);
