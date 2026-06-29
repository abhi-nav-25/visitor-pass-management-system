const XLSX = require("xlsx");
const Pass = require("../models/pass");
const QRCode = require("qrcode");
const RenewalHistory = require("../models/renewalHistory");

const exportPasses = async (req, res) => {
    try {
        const passes = await Pass.find()
            .populate("visitor")
            .populate("worker");

        const data = passes.map((pass) => ({
            PassNumber: pass._id.toString(),
            Type: pass.passType,
            Name:
                pass.visitor?.name ||
                pass.worker?.name ||
                "N/A",
            Mobile:
                pass.visitor?.mobile ||
                pass.worker?.mobile ||
                "N/A",
            IssueDate: new Date(pass.issueDate).toLocaleDateString("en-IN"),
            ExpiryDate: new Date(pass.expiryDate).toLocaleDateString("en-IN"),
            Status: pass.status,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Passes"
        );

        const buffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx",
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=passes.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPass = async (req, res) => {
    try {
        const { passType, visitor, worker } = req.body;
        if (passType === "visitor") {
            if (!visitor) {
                return res.status(400).json({ message: "Visitor ID is required" });
            }
        }
        else if (passType === "worker") {
            if (!worker) {
                return res.status(400).json({ message: "Worker ID is required" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid pass type" });
        }
        const pass = await Pass.create(req.body);
        const qrData = JSON.stringify({
            passId: pass._id,
            passType: pass.passType
        });
        const qrCode = await QRCode.toDataURL(qrData);
        pass.qrCode = qrCode;
        await pass.save();

        res.status(201).json(pass);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getPasses = async (req, res) => {
    try {
        const passes = await Pass.find()
            .populate("visitor")
            .populate("worker");

        for (const pass of passes) {
            if (
                pass.status === "active" &&
                new Date(pass.expiryDate) < new Date()
            ) {
                pass.status = "expired";
                await pass.save();
            }
        }

        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getPassById = async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id).populate("visitor").populate("worker");
        if (!pass) {
            return res.status(404).json({ message: "Pass not found" });
        }
        res.status(200).json(pass);
    } catch (error) {
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
            { new: true }
        );
        if (!pass) {
            return res.status(404).json({ message: "Pass not found" });
        }
        res.status(200).json(pass);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        if (!pass) {
            return res.status(404).json({ message: "Entry Denied. Pass not found" })
        }
        if (pass.status === "active")
            return res.status(200).json({ message: "Welcome!", pass })
        else
            return res.status(403).json({ message: "Entry Denied. Pass is not active" })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

const getPassQR = async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id);
        if (!pass) {
            return res.status(404).json({ message: "Pass not found" });
        }
        res.status(200).json({ qrCode: pass.qrCode });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyQRCode = async (req, res) => {
    try {
        const { qrData } = req.body;
        const data = JSON.parse(qrData);
        const pass = await Pass.findById(data.passId)
            .populate("visitor")
            .populate("worker");
        if (!pass) {
            return res.status(404).json({ message: "Entry Denied. Pass not found" });
        }
        if (data.passType !== pass.passType) {
            return res.status(403).json({ message: "Invalid QR code" });
        }
        if (pass.status !== "active") {
            return res.status(403).json({ message: "Entry Denied. Pass is not active" });
        }
        if (new Date(pass.expiryDate) < new Date()) {
            return res.status(403).json({ message: "Entry Denied. Pass expired" });
        }
        res.status(200).json({ message: "Welcome!", pass });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchPasses = async (req, res) => {
    try {
        const { passType, status } = req.query;
        let filter = {};
        if (passType) {
            filter.passType = passType;
        }
        if (status) {
            filter.status = status;
        }
        const passes = await Pass.find(filter)
            .populate("visitor")
            .populate("worker");
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getActivePasses = async (req, res) => {
    try {
        const passes = await Pass.find({ status: "active" })
            .populate("visitor")
            .populate("worker");
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getExpiredPasses = async (req, res) => {
    try {
        const passes = await Pass.find({ expiryDate: { $lt: new Date() } })
            .populate("visitor")
            .populate("worker");
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const renewPass = async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.id);
        if (!pass) {
            return res.status(404).json({
                message: "Pass not found"
            });
        }
        const oldExpiryDate = pass.expiryDate;
        const newExpiryDate = new Date(req.body.newExpiryDate);
        if (newExpiryDate <= oldExpiryDate) {
            return res.status(400).json({
                message: "New expiry date must be later than current expiry date"
            });
        }
        pass.expiryDate = newExpiryDate;
        pass.status = "active";
        await pass.save();
        await RenewalHistory.create({
            pass: pass._id,
            oldExpiryDate,
            newExpiryDate: req.body.newExpiryDate,
            renewedBy: req.user._id
        });
        res.status(200).json(pass);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getRenewalHistory = async (req, res) => {
    try {
        const history = await RenewalHistory.find({
            pass: req.params.id
        })
            .populate("renewedBy", "name email role")
            .sort({ renewedAt: -1 });
        res.status(200).json(history);
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
    deletePass,
    verifyPass,
    getPassQR,
    verifyQRCode,
    searchPasses,
    getActivePasses,
    getExpiredPasses,
    renewPass,
    getRenewalHistory,
    exportPasses
};