const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");
const enseignantRoutes = require("./api/routes/enseignant");
const userRoutes = require("./api/routes/user");
const seanceRoutes = require("./api/routes/seance");
const commentaireRoutes = require("./api/routes/commentaire");
const niveauRoutes = require("./api/routes/niveau");
const coursRoutes = require("./api/routes/cours");
const lessonRoutes = require("./api/routes/lesson");
require("dotenv").config();
mongoose.connect(MONGOURI, {});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeath");
});
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/enseignant", enseignantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seance", seanceRoutes);
app.use("/api/commentaire", commentaireRoutes);
app.use("/api/niveau", niveauRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/lesson", lessonRoutes);

app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500).json({
    error,
  });
});

module.exports = app;
