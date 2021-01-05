const mongoose = require("mongoose");
const { ModelName } = require("../../utils/modelNames");

const RequestSchema = new mongoose.Schema(
  {
    player: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(ModelName.Request, RequestSchema);
