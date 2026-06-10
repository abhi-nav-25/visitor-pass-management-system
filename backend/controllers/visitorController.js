const Visitor=require("../models/Visitor");

const getVisitors=async(req,res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
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

const getVisitorById=async(req,res)=>{
    try{
        const visitor=await Visitor.findById(req.params.id);
        if(!visitor){
            return res.status(404).json({ message:"Visitor not found"});
        }
        res.status(200).json(visitor);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const updateVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!visitor){
            return res.status(404).json({message:"Visitor not found"});
        }
        res.status(200).json(visitor);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const deleteVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndDelete(req.params.id);
        if(!visitor){
            return res.status(404).json({message:"Visitor not found"});
        }
        res.status(200).json({message:"Visitor deleted successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports={
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor
};