const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "personPhoto") {
      cb(null, "uploads/persons");
    } else if (file.fieldname === "idProofPhoto") {
      cb(null, "uploads/idproofs");
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;