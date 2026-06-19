const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createGate,
  getGates,
  getGate,
  updateGate,
  deleteGate,
} = require("../controllers/gateController");

router.post("/", protect, authorize("admin"), createGate);
router.put("/:id", protect, authorize("admin"), updateGate);
router.delete("/:id", protect, authorize("admin"), deleteGate);
router.get("/", protect, getGates);
router.get("/:id", protect, getGate);

module.exports = router;