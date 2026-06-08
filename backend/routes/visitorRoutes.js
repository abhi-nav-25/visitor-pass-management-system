const express = require("express");
const router = express.Router();
const {
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require("../controllers/visitorController");

router.get("/", getVisitors);
router.post("/", createVisitor);
router.get("/:id", getVisitorById);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);
module.exports = router;