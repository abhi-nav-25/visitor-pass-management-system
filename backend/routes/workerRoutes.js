const express = require("express");
const router = express.Router();
const {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker
} = require("../controllers/workerController");

router.get("/", getWorkers);
router.post("/", createWorker);
router.get("/:id", getWorkerById);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);
module.exports=router;