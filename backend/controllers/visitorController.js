const getVisitors = (req, res) => {
    res.json({
        message: "Visitors fetched successfully"
    });
};

module.exports = {
    getVisitors
};