const mongoose = require("mongoose");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const Enseignant = require("../models/enseignant");
const user = require("../models/user");

exports.getAllEnseignant = (req, res, next) => {
  Enseignant.find()
    .populate("cours")
    .exec()
    .then((enseignants) => {
      return res.json({ enseignants });
    })
    .catch((error) => {
      next(error);  
    });
};

exports.getOneEnseignant = (req, res, next) => {
  const id = req.params.enseignantId;
  Enseignant.findById(id)
    .select("email name phone cours langue userType heureFin heureDebut")
    .populate("cours")
    .exec()
    .then((enseignant) => {
      if (enseignant) {
        res.status(200).json(enseignant);
      } else {
        res.status(404).json({
          message: "ens Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.createOneEnseignant = (req, res, next) => {
  Enseignant.find({ email: req.body.email })
    .exec()
    .then((enseignant) => {
      if (enseignant.length < 1) {
        return passwordHash.generate(req.body.password);
      }
      const error = new Error();
      error.message = "enseignant Exists!";
      throw error;
    })
    .then((hash) => {
      const enseignant = createEnseignant(
        req.body.name,
        req.body.phone,
        req.body.email,

        req.body.url,
        req.body.langue,
        req.body.cours,

        hash
      );
      return enseignant.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "Enseignant created successfully!",
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateOneEneignant = (req, res, next) => {
  const enseignantId = req.params.enseignantId;

  Enseignant.update({ _id: enseignantId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated Teacher Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteEnseignant = (req, res, next) => {
  const enseignantId = req.params.enseignantId;
  Enseignant.deleteOne({ _id: enseignantId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Enseignant Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete Enseignant!";
      next(error);
    });
};

function createEnseignant(name, phone, email, url, langue, cours, hash) {
  return new Enseignant({
    _id: mongoose.Types.ObjectId(),
    name: name,
    phone: phone,
    email: email,

    url: url,
    langue: langue,
    cours: cours,
    password: hash,
  });
}
exports.getTotalTeacherCount = (req, res, next) => {
  Enseignant.find()
    .exec()
    .then((enseignants) => {
      const response = {
        count: enseignants.length,
      };
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
exports.getProfile = (req, res, next) => {
  Enseignant.findOne({ email: req.userData.email })
    .select("email name phone  userType cours")
    .populate("cours")
    .exec()
    .then((enseignant) => {
      if (enseignant.length < 1) {
        const error = new Error();
        error.message = "Auth Failed!";
        throw error;
      }
      return enseignant;
    })
    .then((enseignant) => {
      if (enseignant) {
        return res.json({ enseignant });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.logIn = (req, res, next) => {
  let email = undefined,
    enseignantId = undefined;
  userType = undefined;
  Enseignant.find({ email: req.body.email })
    .exec()
    .then((enseignant) => {
      if (enseignant.length < 1) {
        const error = new Error();
        error.message = "Auth Failed!";
        throw error;
      }
      email = enseignant[0].email;
      userType = enseignant[0].userType;
      enseignantId = enseignant[0]._id;
      userName = enseignant[0].name;
      console.log(email, userType);
      password = passwordHash.verify(req.body.password, enseignant[0].password);
      console.log(password);
      return password;
    })
    .then((result) => {
      if (result) {
        const token = jwt.sign(
          {
            email: email,
            enseignantId: enseignantId,
            userType,
            userName: userName,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth Successful!",
          token: token,
          enseignantId: enseignantId,
          userName: userName,
        });
      }
      const error = new Error();
      error.message = "Auth Failed!";
      throw error;
    })
    .catch((error) => {
      next(error);
    });
};
