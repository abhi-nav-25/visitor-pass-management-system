const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{
    try {
        const { name,email,password,role }=req.body;
        const user=await User.findOne({email});
        if(user)
            return res.status(400).json({message: "User already exists!"});
        const hashedPassword = await bcrypt.hash(password, 10);            
        const newUser=await User.create({ name, email, password: hashedPassword, role });
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "User does not exist"});   
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({message: "Wrong password!"});
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return res.status(200).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};