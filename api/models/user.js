const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userType: {
      type: mongoose.Schema.Types.String,
      default: "student",
    },
    name: {
      type: String,
      require: true,
      unique: false,
    },
    phone: {
      type: String,
      require: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    niveau: { type: String, required: false },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("User", userSchema);
