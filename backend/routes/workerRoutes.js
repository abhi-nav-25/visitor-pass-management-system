const express = require("express");
const router = express.Router();
const {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker,
    searchWorkers
} = require("../controllers/workerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports", "receptionist"),getWorkers);
router.post("/",protect,authorize("admin", "receptionist"),createWorker);
router.get("/search", protect, authorize("admin", "receptionist"), searchWorkers);
router.get("/:id",protect,authorize("admin", "reports", "receptionist"),getWorkerById);
router.put("/:id",protect,authorize("admin", "receptionist"),updateWorker);
router.delete("/:id",protect,authorize("admin"),deleteWorker);

module.exports=router;