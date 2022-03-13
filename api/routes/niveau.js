const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const NiveauController = require("../controllers/niveau");

router.post("/", checkAuths.userAuth, NiveauController.createOneNiveau);

router.get("/:id", checkAuths.userAuth, NiveauController.getNiveau);
//router.delete("/:id", checkAuths.userAuth, CommentaireController.deleteCommentaire);
router.patch("/:niveauId", checkAuths.userAuth, NiveauController.updateNiveau);
module.exports = router;
