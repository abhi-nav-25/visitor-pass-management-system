const Worker=require("../models/worker");

const createWorker=async (req,res) =>{
    try{
        const worker=await Worker.create(req.body);
        res.status(201).json(worker);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getWorkers = async (req, res) => {
    try {
        const workers = await Worker.find();
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({message: "Worker not found"});
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateWorker = async (req, res) => {
    try {
        const worker = await Worker.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        if (!worker) {
            return res.status(404).json({message: "Worker not found"});
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteWorker = async (req, res) => {
    try {
        const worker=await Worker.findByIdAndDelete(req.params.id);
        if(!worker){
            return res.status(404).json({message: "Worker not found"})
        }
        return res.status(200).json({message:"Visitor deleted successfully"});;
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker
};