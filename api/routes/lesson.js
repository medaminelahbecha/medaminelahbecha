const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const LessonController = require("../controllers/lesson");

router.post("/", checkAuths.adminAuth, LessonController.createOneLesson);

router.get("/", checkAuths.userAuth, LessonController.getAllLessons);
router.delete("/:id", checkAuths.adminAuth, LessonController.deleteLesson);

module.exports = router;
