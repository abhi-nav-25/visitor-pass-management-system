const express = require("express");
const router = express.Router();
const {
    getPasses,
    createPass,
    getPassById,
    updatePass,
    deletePass,
    verifyPass,
    getPassQR,
    verifyQRCode
} = require("../controllers/passController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports", "security"),getPasses);
router.post("/",protect,authorize("admin", "receptionist"),createPass);
router.post("/verify-qr",protect,authorize("admin", "security"),verifyQRCode);
router.get("/:id/qr",protect,authorize("admin", "security", "reports"),getPassQR);
router.get("/verify/:id",protect,authorize("admin", "security"),verifyPass);
router.get("/:id",protect,authorize("admin", "reports", "security"),getPassById);
router.put("/:id",protect,authorize("admin", "receptionist"),updatePass);
router.delete("/:id",protect,authorize("admin"),deletePass);

module.exports = router;