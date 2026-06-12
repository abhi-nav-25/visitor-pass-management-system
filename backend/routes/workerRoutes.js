const express = require("express");
const router = express.Router();
const {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker
} = require("../controllers/workerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/",protect,authorize("admin", "reports"),getWorkers);
router.post("/",protect,authorize("admin", "receptionist"),createWorker);
router.get("/:id",protect,authorize("admin", "reports"),getWorkerById);
router.put("/:id",protect,authorize("admin", "receptionist"),updateWorker);
router.delete("/:id",protect,authorize("admin"),deleteWorker);

module.exports=router;