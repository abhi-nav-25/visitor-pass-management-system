const express = require("express");
const router = express.Router();
const {
    getPasses,
    createPass,
    getPassById,
    updatePass,
    deletePass
} = require("../controllers/passController");

router.get("/", getPasses);
router.post("/", createPass);
router.get("/:id", getPassById);
router.put("/:id", updatePass);
router.delete("/:id", deletePass);
module.exports = router;