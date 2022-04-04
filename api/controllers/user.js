const mongoose = require("mongoose");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.isAdmin = (req, res, next) => {
  console.log(req.userData.userType);
  if (req.userData.userType == "admin") return res.json(true);
  else return res.json(false);
};
exports.isStudent = (req, res, next) => {
  if (req.userData.userType == "student") return res.json(true);
  else return res.json(false);
};
exports.isTeacher = (req, res, next) => {
  console.log(req.userData.userType);
  if (req.userData.userType == "teacher") return res.json(true);
  else return res.json(false);
};
exports.updateOneUser = (req, res, next) => {
  const userId = req.params.userId;

  User.update({ _id: userId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated User Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.signUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return passwordHash.generate(req.body.password);
      }
      const error = new Error();
      error.message = "User Exists!";
      throw error;
    })
    .then((hash) => {
      const user = createUser(
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.country,
        req.body.gender,
        hash
      );
      return user.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "User created successfully!",
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getProfile = (req, res, next) => {
  User.findOne({ email: req.userData.email })
    .select("email _id name phone niveau userType")
    .exec()
    .then((user) => {
      if (user.length < 1) {
        const error = new Error();
        error.message = "Auth Failed!";
        throw error;
      }
      return user;
    })
    .then((user) => {
      if (user) {
        return res.json({ user });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.getAll = (req, res, next) => {
  User.find()
    .select()
    .exec()
    .then((users) => {
      return res.json({ users });
    })
    .catch((error) => {
      next(error);
    });
};

exports.logIn = (req, res, next) => {
  let email = undefined,
    userId = undefined;
  userType = undefined;
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        const error = new Error();
        error.message = "Auth Failed!";
        throw error;
      }
      email = user[0].email;
      userType = user[0].userType;
      userId = user[0]._id;
      userName = user[0].name;
      return passwordHash.verify(req.body.password, user[0].password);
    })
    .then((result) => {
      if (result) {
        const token = jwt.sign(
          {
            email: email,
            userId: userId,
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
          userId: userId,
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

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.remove({ _id: userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete User!";
      next(error);
    });
};

function createUser(name, phone, email, country, gender, hash) {
  return new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    name: name,
    phone: phone,
    country: country,
    gender: gender,
    password: hash,
  });
}

//
exports.getLast30DaysRegisteredUser = async function (req, res, next) {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  console.log(date.toDateString());
  return User.aggregate([
    {
      $match: {
        created_at: {
          $gte: date,
        },
      },
    },
    {
      $count: "userCount",
    },
  ]).then((r) => {
    console.log(r);
    return res.status(200).json(r[0].userCount);
  });
};

exports.getTotalUserCount = (req, res, next) => {
  return User.find()
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
      };

      res.status(200).json(response);
    });
};
