const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");

const EnseignantController = require("../controllers/enseignant");

router.post(
  "/",
  checkAuths.adminAuth,
  EnseignantController.createOneEnseignant
);
router.patch(
  "/:enseignantId",
  checkAuths.adminAuth,
  EnseignantController.updateOneEneignant
);
router.delete(
  "/:enseignantId",
  checkAuths.adminAuth,
  EnseignantController.deleteEnseignant
);
router.get("/", checkAuths.userAuth, EnseignantController.getAllEnseignant);
router.get("/ens/:enseignantId", EnseignantController.getOneEnseignant);
router.post("/login", EnseignantController.logIn);
router.get(
  "/teacherCount",
  checkAuths.adminAuth,
  EnseignantController.getTotalTeacherCount
);
router.get("/profil", checkAuths.userAuth, EnseignantController.getProfile);
module.exports = router;
