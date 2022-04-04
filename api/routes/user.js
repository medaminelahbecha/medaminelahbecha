const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.logIn);
router.get("/is-admin", checkAuths.userAuth, UserController.isAdmin);
router.get("/is-student", checkAuths.userAuth, UserController.isStudent);
router.get("/is-teacher", checkAuths.userAuth, UserController.isTeacher);

router.get("", UserController.getAll);
router.get("/me", checkAuths.userAuth, UserController.getProfile);
router.get(
  "/userCount",
  checkAuths.adminAuth,
  UserController.getTotalUserCount
);
router.get(
  "/lastMounthUsertotal",
  checkAuths.adminAuth,
  UserController.getLast30DaysRegisteredUser
);
router.delete("/:userId", checkAuths.adminAuth, UserController.deleteUser);
router.patch("/:userId", checkAuths.adminAuth, UserController.updateOneUser);
module.exports = router;
