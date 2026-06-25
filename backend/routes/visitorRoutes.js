const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");
const {
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
} = require("../controllers/visitorController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin", "reports", "receptionist"), getVisitors);
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

    body("idProofType")
        .notEmpty()
        .withMessage("ID Proof Type is required"),

    body("idProofNumber")
        .trim()
        .notEmpty()
        .withMessage("ID Proof Number is required"),

    validateRequest,

    createVisitor
);

router.get("/:id", protect, authorize("admin", "reports", "receptionist"), getVisitorById);
router.put("/:id", protect, authorize("admin", "receptionist"), updateVisitor);
router.delete("/:id", protect, authorize("admin"), deleteVisitor);

module.exports = router;