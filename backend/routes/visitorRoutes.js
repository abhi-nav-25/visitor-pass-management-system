const express = require("express");
const router = express.Router();
const {
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
    searchVisitors,
} = require("../controllers/visitorController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports","receptionist"),getVisitors);
router.post("/",protect,authorize("admin", "receptionist"),createVisitor);
router.get("/search",protect,authorize("admin", "receptionist"),searchVisitors);
router.get("/:id",protect,authorize("admin", "reports","receptionist"),getVisitorById);
router.put("/:id",protect,authorize("admin", "receptionist"),updateVisitor);
router.delete("/:id",protect,authorize("admin"),deleteVisitor);

module.exports = router;