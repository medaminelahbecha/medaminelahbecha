const mongoose = require("mongoose");
const { getUserConnecte } = require("../middleware/userConnecte");
const Seance = require("../models/seance");
const jwt = require("jsonwebtoken");
const EnseignantController = require("../controllers/enseignant");

const userConnecte = require("./user");

exports.getAllSeances = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      console.log(decodedToken);
      console.log(decodedToken.userId);
      a = JSON.stringify(decodedToken.userId);

      let q = Seance.find();

      q.populate("enseignant")
        .populate("user")
        .populate("cours")
        .populate("lesson")
        .exec()
        .then((seances) => {
          const response = {
            count: seances.length,
            seances: seances.map((seance) => {
              return {
                _id: seance._id,
                cours: seance.cours,
                enseignant: seance.enseignant,
                user: seance.user,
                dateDebut: seance.dateDebut,
                dateFin: seance.dateFin,
                lesson: seance.lesson,
                resume: seance.resume,
                presence: seance.presence,
              };
            }),
          };

          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          next(error);
        });
    }
  }
};
exports.getAllSeancesEns = (req, res, next) => {
  if (req.headers.authorization) {
    const id = req.params["id"];
    var query = { enseignant: id };
    let q = Seance.find(query);

    q.populate("enseignant")
      .populate("user")
      .populate("cours")
      .populate("lesson")
      .exec()
      .then((seances) => {
        const response = {
          count: seances.length,
          seances: seances.map((seance) => {
            return {
              _id: seance._id,
              cours: seance.cours,
              enseignant: seance.enseignant,
              user: seance.user,
              dateDebut: seance.dateDebut,
              dateFin: seance.dateFin,
              lesson: seance.lesson,
              resume: seance.resume,
              presence: seance.presence,
            };
          }),
        };

        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
};
exports.getAllSeancesStudent = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      console.log(decodedToken);
      console.log(decodedToken.userId);
      a = JSON.stringify(decodedToken.userId);
      const id = req.params["id"];
      var query = { user: id };
      let q = Seance.find(query);

      q.populate("enseignant")
        .populate("user")
        .populate("cours")
        .populate("lesson")
        .exec()
        .then((seances) => {
          const response = {
            count: seances.length,
            seances: seances.map((seance) => {
              return {
                _id: seance._id,
                cours: seance.cours,
                enseignant: seance.enseignant,
                user: seance.user,
                dateDebut: seance.dateDebut,
                dateFin: seance.dateFin,
                lesson: seance.lesson,
                resume: seance.resume,
                presence: seance.presence,
              };
            }),
          };

          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          next(error);
        });
    }
  }
};
exports.getAllSeancesCalendar = (req, res, next) => {
  Seance.find()
    .populate("lesson")

    .exec()
    .then((seances) => {
      const response = {
        count: seances.length,
        seances: seances.map((seance) => {
          let title = seance.lesson;
          return {
            title: title.name,

            start: seance.dateDebut,
            end: seance.dateFin,
          };
        }),
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      next(error);
    });
};
exports.getAllSeancesCalendarEns = (req, res, next) => {
  const id = req.params["id"];
  var query = { enseignant: id };
  let q = Seance.find(query)
    .populate("enseignant")
    .populate("cours")
    .populate("user");

  q.exec()
    .then((seances) => {
      const response = {
        count: seances.length,
        seances: seances.map((seance) => {
          let cour = seance.cours.name;
          let startHours = seance.enseignant.heureDebut;
          let endtHours = seance.enseignant.heureFin;
          let url = seance.enseignant;
          return {
            seance: seance,
            startHours: startHours,
            endtHours: endtHours,
            title: cour,
            //url: url.url,
            color: "	#DCDCDC",
            start: seance.dateDebut,
            end: seance.dateFin,
          };
        }),
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      next(error);
    });
};
exports.getAllSeancesCalendarStudent = (req, res, next) => {
  const id = req.params["id"];
  var query = { user: id };
  let q = Seance.find(query).populate("lesson").populate("enseignant");

  q.exec()
    .then((seances) => {
      const response = {
        count: seances.length,
        seances: seances.map((seance) => {
          console.log(seance);
          let title = seance.lesson;
          let url = seance.enseignant;
          return {
            title: title.name,
            url: url.url,
            start: seance.dateDebut,
            end: seance.dateFin,
            color: "red",
          };
        }),
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      next(error);
    });
};
exports.createOneSeance = (req, res, next) => {
  const ens = createSeance(
    req.body.cours,
    req.body.enseignant,
    req.body.user,
    req.body.dateDebut,
    req.body.dateFin,
    req.body.lesson,
    req.body.resume,
    req.body.presence
  );
  return ens
    .save()

    .then((seance) => {
      return res.status(201).json({
        message: "seance created successfully!",
        seance: {
          _id: seance._id,
          cours: seance.cours,
          enseignant: seance.enseignant,
          user: seance.user,
          dateDebut: seance.dateDebut,
          dateFin: seance.dateFin,
          lesson: seance.lesson,
          resume: seance.resume,
          presence: seance.presence,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};
exports.updateOneSeance = (req, res, next) => {
  const seanceId = req.params.seanceId;

  Seance.update({ _id: seanceId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated seance Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteSeance = (req, res, next) => {
  const seanceId = req.params.seanceId;
  Seance.deleteOne({ _id: seanceId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Seance Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete Seance!";
      next(error);
    });
};

function createSeance(
  cours,
  enseignant,
  user,
  dateDebut,
  dateFin,
  lesson,
  resume,
  presence
) {
  return new Seance({
    _id: new mongoose.Types.ObjectId(),
    cours: cours,
    enseignant: enseignant,
    user: user,
    dateDebut: dateDebut,
    dateFin: dateFin,
    lesson: lesson,
    resume: resume,
    presence: presence,
  });
}

exports.getTotalSeanceCount = (req, res, next) => {
  return Seance.find()
    .exec()
    .then((seances) => {
      const response = {
        count: seances.length,
      };
      res.status(200).json(response);
    });
};
