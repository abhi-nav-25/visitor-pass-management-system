const Visitor = require("../models/visitor");

const getVisitors = async (req, res) => {
    try {
        const { search } = req.query;

        let filter = {};

        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                    { idProofNumber: { $regex: search, $options: "i" } }
                ]
            };
        }

        const visitors = await Visitor.find(filter);

        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
console.log("FILES RECEIVED:", req.files);
const createVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.create({
            ...req.body,

            personPhoto:
                req.files?.personPhoto?.[0]?.path
                    ?.replace(/\\/g, "/") || "",

            idProofPhoto:
                req.files?.idProofPhoto?.[0]?.path
                    ?.replace(/\\/g, "/") || "",
        });
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVisitor = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
        };

        if (req.files?.personPhoto?.[0]) {
            updateData.personPhoto =
                req.files.personPhoto[0].path.replace(/\\/g, "/");
        }

        if (req.files?.idProofPhoto?.[0]) {
            updateData.idProofPhoto =
                req.files.idProofPhoto[0].path.replace(/\\/g, "/");
        }

        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found",
            });
        }

        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.status(200).json({ message: "Visitor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getVisitors,
    createVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
};