const Worker = require("../models/worker");

const createWorker = async (req, res) => {
    try {
        const worker = await Worker.create(req.body);
        res.status(201).json(worker);
    } catch (error) {
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
            return res.status(404).json({ message: "Worker not found" });
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorker = async (req, res) => {
    try {
        const worker = await Worker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorker = async (req, res) => {
    try {
        const worker = await Worker.findByIdAndDelete(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" })
        }
        return res.status(200).json({ message: "Worker deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchWorkers = async (req, res) => {
    try {
        const {
            name,
            mobile,
            department,
            designation,
            idProofNumber
        } = req.query;
        let filter = {};

        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }

        if (mobile) {
            filter.mobile = mobile;
        }

        if (department) {
            filter.department = {
                $regex: department,
                $options: "i"
            };
        }

        if (designation) {
            filter.designation = {
                $regex: designation,
                $options: "i"
            };
        }

        if (idProofNumber) {
            filter.idProofNumber = {
                $regex: idProofNumber,
                $options: "i"
            };
        }

        const workers = await Worker.find(filter);

        res.status(200).json(workers);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker,
    searchWorkers
};