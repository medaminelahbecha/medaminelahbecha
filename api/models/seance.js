const mongoose = require("mongoose");

const seanceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cours",
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  resume: { type: String },
  presence: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
});

module.exports = mongoose.model("Seance", seanceSchema);
