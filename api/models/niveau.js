const mongoose = require("mongoose");

const niveauSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  listening: { type: String },
  reading: { type: String },
  interraction: { type: String },
  production: { type: String },
  writing: { type: String },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 
  
  
});

module.exports = mongoose.model("Niveau", niveauSchema);
