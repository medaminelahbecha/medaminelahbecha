const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const LessonController = require("../controllers/lesson");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter
});

router.post(
  "/",
  checkAuths.adminAuth,
  upload.single("lessonImage"),
  LessonController.createOneLesson
);

router.get("/", checkAuths.userAuth, LessonController.getAllLessons);
router.delete("/:id", checkAuths.adminAuth, LessonController.deleteLesson);

module.exports = router;
