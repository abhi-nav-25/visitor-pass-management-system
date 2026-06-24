const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  upload.fields([
    { name: "personPhoto", maxCount: 1 },
    { name: "idProofPhoto", maxCount: 1 },
  ]),
  (req, res) => {
    res.status(200).json({
      personPhoto:
        req.files?.personPhoto?.[0]?.path || "",
      idProofPhoto:
        req.files?.idProofPhoto?.[0]?.path || "",
    });
  }
);

module.exports = router;