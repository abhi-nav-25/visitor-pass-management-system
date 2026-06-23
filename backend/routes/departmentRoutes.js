const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  authorize("admin"),
  createDepartment
);

router.get(
  "/",
  protect,
  getDepartments
);

router.get(
  "/:id",
  protect,
  getDepartment
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDepartment
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDepartment
);

module.exports = router;