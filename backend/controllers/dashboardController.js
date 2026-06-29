const Visitor = require("../models/visitor");
const Worker = require("../models/worker");
const Pass = require("../models/pass");
const EntryExitLog = require("../models/entryExitLog");

const getDashboardStats = async (req, res) => {
  try {
    const [
      visitorCount,
      workerCount,
      passCount,
      logCount,
      recentVisitors,
      recentLogs,
    ] = await Promise.all([
      Visitor.countDocuments(),
      Worker.countDocuments(),
      Pass.countDocuments(),
      EntryExitLog.countDocuments(),

      Visitor.find()
        .select("name mobile purpose")
        .sort({ createdAt: -1 })
        .limit(5),

      EntryExitLog.find()
        .select("entryTime exitTime status")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      visitorCount,
      workerCount,
      passCount,
      logCount,
      recentVisitors,
      recentLogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};