const express = require("express");
const router = express.Router();
const checkAuths = require("../middleware/check-auth");
const userC = require("../middleware/userConnecte");
const SeanceController = require("../controllers/seance");

router.post("/", checkAuths.userAuth, SeanceController.createOneSeance);
router.get("/userConnecte", checkAuths.userAuth, userC.getUserConnecte);
router.get("/", checkAuths.userAuth, SeanceController.getAllSeances);
router.get(
  "/calendar",
  checkAuths.userAuth,
  SeanceController.getAllSeancesCalendar
);
router.patch(
  "/:seanceId",
  checkAuths.userAuth,
  SeanceController.updateOneSeance
);
router.get(
  "/seanceCount",
  checkAuths.adminAuth,
  SeanceController.getTotalSeanceCount
);
router.get(
  "/teacher/:id",
  checkAuths.userAuth,
  SeanceController.getAllSeancesCalendarEns
);
router.get(
  "/student/:id",
  checkAuths.userAuth,
  SeanceController.getAllSeancesCalendarStudent
);
router.get(
  "/seanceS/:id",
  checkAuths.userAuth,
  SeanceController.getAllSeancesStudent
);
router.get(
  "/seanceT/:id",
  checkAuths.userAuth,
  SeanceController.getAllSeancesEns
);

router.delete("/:seanceId", checkAuths.userAuth, SeanceController.deleteSeance);
module.exports = router;
