const EntryExitLog = require("../models/entryExitLog");
const Pass = require("../models/pass");
const XLSX = require("xlsx");

const exportLogs = async (req, res) => {
    try {
        const logs = await EntryExitLog.find()
            .populate({
                path: "pass",
                populate: [
                    { path: "visitor" },
                    { path: "worker" },
                ],
            });

        const data = logs.map((log) => ({
              PassNumber: log.pass?._id?.toString() || "N/A",
            Name:
                log.pass?.visitor?.name ||
                log.pass?.worker?.name ||
                "N/A",
            EntryTime: log.entryTime
                ? new Date(log.entryTime).toLocaleString("en-IN")
                : "-",

            ExitTime: log.exitTime
                ? new Date(log.exitTime).toLocaleString("en-IN")
                : "-",
            Status: log.status,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Logs"
        );

        const buffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx",
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=logs.xlsx"
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

const entryPerson = async (req, res) => {
    try {
        const pass = await Pass.findById(req.params.passId);
        if (!pass)
            return res.status(404).json({ message: "Pass not found" });
        else {
            const log = await EntryExitLog.findOne({ pass: pass._id }).sort({ createdAt: -1 });
            if (log && log.status === "inside")
                return res.status(400).json({ message: "Person is already inside" });
            else {
                const { gate } = req.body;
                await EntryExitLog.create({
                    pass: pass._id,
                    entryTime: new Date(),
                    entryGate: gate,
                    status: "inside"
                });
                return res.status(200).json({ message: "Welcome!" });
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
        const pass = await Pass.findById(req.params.passId);
        if (!pass)
            return res.status(404).json({ message: "Pass not found" });
        else {
            const log = await EntryExitLog.findOne({ pass: pass._id }).sort({ createdAt: -1 });
            if (!log || log.status === "outside")
                return res.status(400).json({ message: "No active entry found" });
            log.exitTime = new Date();
            log.exitGate = req.body.gate;
            log.status = "outside";
            await log.save();
            return res.status(200).json({ message: "Exit recorded" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllLogs = async (req, res) => {
    try {
        const logs = await EntryExitLog.find()
            .populate("entryGate", "gateName gateCode")
            .populate("exitGate", "gateName gateCode")
            .populate({
                path: "pass",
                populate: [
                    {
                        path: "visitor"
                    },
                    {
                        path: "worker"
                    }
                ]
            });
        return res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getCurrentlyInside = async (req, res) => {
    try {
        const logs = await EntryExitLog.find({ status: "inside" })
            .populate("entryGate", "gateName gateCode")
            .populate("exitGate", "gateName gateCode")
            .populate({
                path: "pass",
                populate: [
                    {
                        path: "visitor"
                    },
                    {
                        path: "worker"
                    }
                ]
            });
        return res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    entryPerson,
    exitPerson,
    getAllLogs,
    getCurrentlyInside,
    exportLogs,
};