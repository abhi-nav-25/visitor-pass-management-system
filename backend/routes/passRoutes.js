const express = require("express");
const router = express.Router();
const {
    getPasses,
    createPass,
    getPassById,
    updatePass,
    deletePass,
    verifyPass
} = require("../controllers/passController");

router.get("/", getPasses);
router.post("/", createPass);
router.get("/verify/:id", verifyPass);
router.get("/:id", getPassById);
router.put("/:id", updatePass);
router.delete("/:id", deletePass);
module.exports = router;