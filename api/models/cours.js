const mongoose = require("mongoose");

const coursSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model("Cours", coursSchema);
