const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cours",
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
