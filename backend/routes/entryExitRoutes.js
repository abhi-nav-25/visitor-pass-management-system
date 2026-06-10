const express = require("express");
const router = express.Router();
const {
    entryPerson,
    exitPerson,
    getAllLogs,
    getCurrentlyInside
} = require("../controllers/entryExitController");


router.post("/entry/:passId", entryPerson);
router.post("/exit/:passId", exitPerson);
router.get("/", getAllLogs);
router.get("/inside", getCurrentlyInside);
module.exports = router;