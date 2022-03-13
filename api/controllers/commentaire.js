const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const commentaire = require("../models/commentaire");


exports.getAllCommentaire = (req, res, next) => {
    const id =req.params['id']
    var query = { user: id };
        let q = commentaire.find(query);
  
        q.populate("enseignant")
          .populate("user")
          .exec()
          .then((commentaires) => {
            const response = {
              count: commentaires.length,
              commentaires: commentaires.map((com) => {
                return {
                  _id: com._id,
                  description: com.description,
                  enseignant: com.enseignant,
                  user: com.user,
                  date: com.date,
                 
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
exports.createOneCommentaire = (req, res, next) => {
    const ens = createCommentaire(
      req.body.description,
      req.body.enseignant,
      req.body.user,
      req.body.date,
     
    );
    return ens
      .save()
  
      .then((commentaire) => {
        return res.status(201).json({
          message: "commentaire created successfully!",
          commentaire: {
            _id: commentaire._id,
            description: commentaire.description,
            enseignant: commentaire.enseignant,
            user: commentaire.user,
            date: commentaire.date,
            
          },
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  exports.deleteCommentaire = (req, res, next) => {
    const id = req.params.id;
    commentaire.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "commentaire Deleted Successfully!",
        });
      })
      .catch((error) => {
        error.message = "Could Not Delete commentaire!";
        next(error);
      });
  };

  function createCommentaire(description, enseignant, user, date) {
    return new commentaire({
      _id: new mongoose.Types.ObjectId(),
      description: description,
      enseignant: enseignant,
      user: user,
      date: date,
      
    });
  }