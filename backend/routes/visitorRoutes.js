const express = require("express");
const router = express.Router();
const {
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require("../controllers/visitorController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports"),getVisitors);
router.post("/",protect,authorize("admin", "receptionist"),createVisitor);
router.get("/:id",protect,authorize("admin", "reports"),getVisitorById);
router.put("/:id",protect,authorize("admin", "receptionist"),updateVisitor);
router.delete("/:id",protect,authorize("admin"),deleteVisitor);

module.exports = router;