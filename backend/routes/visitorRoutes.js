const express = require("express");
const router = express.Router();
const { getVisitors } = require("../controllers/visitorController");

router.get("/", getVisitors);
module.exports = router;