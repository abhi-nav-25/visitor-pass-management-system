const express = require("express");
const router = express.Router();
const { getVisitors, createVisitor} = require("../controllers/visitorController");

router.get("/", getVisitors);
router.post("/", createVisitor);
module.exports = router;