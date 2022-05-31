const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const commentaire = require("../models/commentaire");
const lesson = require("../models/lesson");

exports.getAllLessons = (req, res, next) => {
  let q = lesson.find();

  q.populate("cours")

    .exec()
    .then((lessons) => {
      const response = {
        count: lessons.length,
        lessons: lessons.map((le) => {
          return {
            _id: le._id,
            name: le.name,
            lessonImage: le.lessonImage,
            description: le.description,
            cours: le.cours,
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
exports.createOneLesson = (req, res, next) => {
  const ens = createLesson(req);
  console.log(req);
  ens
    .save()
    .then((lesson) => {
      return res.status(201).json({
        message: "lesson created successfully!",
        lesson: {
          _id: lesson._id,
          name: lesson.name,
          lessonImage: lesson.lessonImage,
          description: lesson.description,
          cours: lesson.cours,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteLesson = (req, res, next) => {
  const id = req.params.id;
  lesson
    .deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "lesson Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete lesson!";
      next(error);
    });
};

function createLesson(req) {
  console.log("aaaaaaa", req.file);
  return new lesson({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    cours: req.body.cours,
    description: req.body.description,
    lessonImage: req.file.path,
  });
}
