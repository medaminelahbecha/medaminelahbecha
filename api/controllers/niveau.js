const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const niveau = require("../models/niveau");

exports.getNiveau = (req, res, next) => {
  const id = req.params["id"];
  var query = { user: id };
  let q = niveau.find(query);

  q.populate("user")
    .exec()
    .then((niveaux) => {
      const response = {
        count: niveaux.length,
        niveaux: niveaux.map((niveau) => {
          return {
            _id: niveau._id,
            listening: niveau.listening,
            reading: niveau.reading,
            interraction: niveau.interraction,
            production: niveau.production,
            writing: niveau.writing,
            user: niveau.user,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
exports.createOneNiveau = (req, res, next) => {
  const niv = createNiveau(
    req.body.listening,
    req.body.reading,
    req.body.interraction,
    req.body.production,
    req.body.writing,
    req.body.user
  );
  return niv
    .save()

    .then((niveau) => {
      return res.status(201).json({
        message: "niveau created successfully!",
        niveau: {
          _id: niveau._id,
          listening: niveau.listening,
          reading: niveau.reading,
          interraction: niveau.interraction,
          production: niveau.production,
          writing: niveau.writing,
          user: niveau.user,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};
exports.updateNiveau = (req, res, next) => {
  const niveauId = req.params.niveauId;

  niveau
    .update({ _id: niveauId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated niveau Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

function createNiveau(
  listening,
  reading,
  interraction,
  production,
  writing,
  user
) {
  return new niveau({
    _id: new mongoose.Types.ObjectId(),
    listening: listening,
    reading: reading,
    interraction: interraction,
    production: production,
    writing: writing,
    user: user,
  });
}
