const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");
const {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker,
} = require("../controllers/workerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports", "receptionist"),getWorkers);
router.post(
  "/",
  protect,
  authorize("admin", "receptionist"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("mobile")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be 10 digits"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required"),

  body("idProofType")
    .notEmpty()
    .withMessage("ID Proof Type is required"),

  body("idProofNumber")
    .trim()
    .notEmpty()
    .withMessage("ID Proof Number is required"),

  validateRequest,

  createWorker
);
router.get("/:id",protect,authorize("admin", "reports", "receptionist"),getWorkerById);
router.put("/:id",protect,authorize("admin", "receptionist"),updateWorker);
router.delete("/:id",protect,authorize("admin"),deleteWorker);

module.exports=router;