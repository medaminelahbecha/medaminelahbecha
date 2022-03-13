const mongoose = require("mongoose");

const enseignantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userType: {
    type: mongoose.Schema.Types.String,
    default: "teacher",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },

  password: { type: String, required: true },
  phone: { type: String, required: true },
  url: { type: String },
  heureDebut: { type: String },
  heureFin: { type: String },
  langue: { type: Array },
  seances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seance",
    required: false,
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cours",
    required: false,
  },
});

module.exports = mongoose.model("Enseignant", enseignantSchema);
