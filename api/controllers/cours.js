const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cours = require("../models/cours");

exports.getAllCours = (req, res, next) => {
  let q = cours.find();

  q.exec()
    .then((cours) => {
      const response = {
        count: cours.length,
        cours: cours.map((cour) => {
          return {
            _id: cour._id,
            name: cour.name,
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
exports.createOneCour = (req, res, next) => {
  const cour = createCour(req.body.name);
  return cour
    .save()

    .then((cour) => {
      return res.status(201).json({
        message: "cour created successfully!",
        cour: {
          _id: cour._id,
          name: cour.name,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteCour = (req, res, next) => {
  const id = req.params.id;
  cours
    .deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "cours Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete cours!";
      next(error);
    });
};

function createCour(name) {
  return new cours({
    _id: new mongoose.Types.ObjectId(),
    name: name,
  });
}
