const Pass = require("../models/Pass");
const QRCode = require("qrcode");

const createPass = async (req, res) => {
    try{
        const { passType, visitor, worker } = req.body;
        if(passType === "visitor"){
            if(!visitor){
                return res.status(400).json({message: "Visitor ID is required"});
            }
        }
        else if(passType === "worker"){
            if(!worker){
                return res.status(400).json({message: "Worker ID is required"});
            }
        }
        else{
            return res.status(400).json({message: "Invalid pass type"});
        }
        const pass=await Pass.create(req.body);
        const qrCode = await QRCode.toDataURL(pass._id.toString());
        pass.qrCode=qrCode;
        await pass.save();

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

const verifyPass = async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id).populate("visitor").populate("worker");
        if(!pass){
            return res.status(404).json({ message:"Entry Denied. Pass not found"})
        }
        else{
            if(pass.status=="active")
                res.status(200).json({message:"Welcome!", pass })
            else
            return res.status(403).json({ message:"Entry Denied. Pass is not active"})
        }
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

module.exports = {
    createPass,
    getPasses,
    getPassById,
    updatePass,
    deletePass,
    verifyPass
};