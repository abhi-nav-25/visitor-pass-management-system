const express = require("express");

const router = express.Router();

const {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/buildingController");

const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    createBuilding
  )
  .get(protect, getBuildings);

router
  .route("/:id")
  .get(protect, getBuilding)
  .put(
    protect,
    authorize("admin"),
    updateBuilding
  )
  .delete(
    protect,
    authorize("admin"),
    deleteBuilding
  );

module.exports = router;