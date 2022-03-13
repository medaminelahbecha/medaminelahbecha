const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const CoursController = require("../controllers/cours");

router.post("/", checkAuths.adminAuth, CoursController.createOneCour);

router.get("/", checkAuths.userAuth, CoursController.getAllCours);
router.delete("/:id", checkAuths.adminAuth, CoursController.deleteCour);

module.exports = router;
