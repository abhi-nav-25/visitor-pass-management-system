const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req,res,next)=>{
    try{
        const header = req.headers.authorization;
        if(!header)
            return res.status(401).json({message: "No token provided"});
        const token=header.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
            return res.status(401).json({message: "User not found"});
        req.user = user;
        next();
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message: "Access denied"
            });
        }
        next();
    };
};

module.exports = {
    protect,
    authorize
};