const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req,res)=>{
    res.status(200).json(req.user);
});
router.get("/admin",protect,authorize("admin"),(req,res)=>{
        res.status(200).json({message: "Welcome Admin"});
    }
);

module.exports = router;