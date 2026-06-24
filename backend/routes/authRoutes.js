const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validateRequest");
const {
    registerUser,
    loginUser
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/register",

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required"),

  validateRequest,

  registerUser
);

router.post(
  "/login",

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password required"),

  validateRequest,

  loginUser
);

router.get("/profile", protect, (req,res)=>{
    res.status(200).json(req.user);
});
router.get("/admin",protect,authorize("admin"),(req,res)=>{
        res.status(200).json({message: "Welcome Admin"});
    }
);

module.exports = router;