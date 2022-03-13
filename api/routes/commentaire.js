
const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const CommentaireController = require("../controllers/commentaire");

router.post("/",checkAuths.userAuth,  CommentaireController.createOneCommentaire);

router.get("/:id", checkAuths.userAuth, CommentaireController.getAllCommentaire);
router.delete("/:id", checkAuths.userAuth, CommentaireController.deleteCommentaire);

module.exports = router;