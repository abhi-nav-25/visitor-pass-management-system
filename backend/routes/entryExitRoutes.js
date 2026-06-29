const express = require("express");
const router = express.Router();
const {
    entryPerson,
    exitPerson,
    getAllLogs,
    getCurrentlyInside,
    exportLogs,
} = require("../controllers/entryExitController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get(
  "/export",
  protect,
  authorize("admin", "reports"),
  exportLogs
);
router.post("/entry/:passId",protect,authorize("admin", "security"),entryPerson);
router.post("/exit/:passId",protect,authorize("admin", "security"),exitPerson);
router.get("/",protect,authorize("admin", "reports"),getAllLogs);
router.get("/inside",protect,authorize("admin", "reports", "security"),getCurrentlyInside);

module.exports = router;