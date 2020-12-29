const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Bad email",
    ],
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.Team,
      default: [],
    },
  ],
  activeTeam: {
    type: mongoose.Schema.ObjectId,
    ref: ModelName.Team,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model(ModelName.User, UserSchema);
