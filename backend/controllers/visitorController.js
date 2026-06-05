const Visitor=require("../models/Visitor");

const getVisitors=async(req,res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createVisitor=async(req,res) => {
    try {
        const visitor=await Visitor.create(req.body);

        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports={
    getVisitors,
    createVisitor
};