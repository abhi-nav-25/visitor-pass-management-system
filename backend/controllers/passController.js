const Pass = require("../models/Pass");

const createPass = async (req, res) => {
    try{
        const pass=await Pass.create(req.body);
        res.status(201).json(pass);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getPasses=async(req,res)=>{
    try{
        const passes=await Pass.find().populate("visitor").populate("worker");
        res.status(200).json(passes);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getPassById=async(req,res)=>{
    try{
        const pass=await Pass.findById(req.params.id).populate("visitor").populate("worker");
        if(!pass){
            return res.status(404).json({message: "Pass not found"});
        }
        res.status(200).json(pass);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const updatePass = async (req, res) => {
    try {
        const pass = await Pass.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        if (!pass) {
            return res.status(404).json({message: "Pass not found"});
        }
        res.status(200).json(pass);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deletePass = async (req, res) => {
    try {
        const pass = await Pass.findByIdAndDelete(req.params.id);
        if (!pass) {
            return res.status(404).json({
                message: "Pass not found"
            });
        }

        return res.status(200).json({
            message: "Pass deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createPass,
    getPasses,
    getPassById,
    updatePass,
    deletePass
};