const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  createArea,
  getAreas,
  getArea,
  updateArea,
  deleteArea,
} = require("../controllers/areaController");

router.post(
  "/",
  protect,
  authorize("admin"),
  createArea
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateArea
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteArea
);

router.get(
  "/",
  protect,
  getAreas
);

router.get(
  "/:id",
  protect,
  getArea
);

module.exports = router;