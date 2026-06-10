const EntryExitLog = require("../models/EntryExitLog");
const Pass = require("../models/Pass");

const entryPerson = async (req, res) => {
    try {
        const pass=await Pass.findById(req.params.passId);
        if(!pass)
            return res.status(404).json({message: "Pass not found"});
        else{
            const log=await EntryExitLog.findOne({pass:pass._id}).sort({createdAt:-1});
            if(log && log.status==="inside")
                return res.status(400).json({message:"Person is already inside"});
            else{
                await EntryExitLog.create({
                    pass: pass._id,
                    entryTime: new Date(),
                    status: "inside"
                });
                return res.status(200).json({message: "Welcome!"});
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const exitPerson = async (req, res) => {
    try {
        const pass=await Pass.findById(req.params.passId);
        if(!pass)
            return res.status(404).json({message: "Pass not found"});
        else{
            const log=await EntryExitLog.findOne({pass:pass._id}).sort({createdAt:-1});
            if(!log || log.status==="outside")
                return res.status(400).json({message:"No active entry found"});
            log.exitTime=new Date();
            log.status="outside";
            await log.save();
            return res.status(200).json({message: "Exit recorded"});
        }
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllLogs= async(req,res)=>{
    try{
        const logs=await EntryExitLog.find().populate("pass");
        return res.status(200).json({logs});
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getCurrentlyInside=async(req,res)=>{
    try{
        const logs=await EntryExitLog.find({status:"inside"}).populate("pass");
        return res.status(200).json({logs});
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    entryPerson,
    exitPerson,
    getAllLogs,
    getCurrentlyInside
};