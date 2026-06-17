const mongoose = require("mongoose");

const renewalHistorySchema = new mongoose.Schema({
    pass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pass",
        required: true
    },

    oldExpiryDate: {
        type: Date,
        required: true
    },

    newExpiryDate: {
        type: Date,
        required: true
    },

    renewedAt: {
        type: Date,
        default: Date.now
    },

    renewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model(
    "RenewalHistory",
    renewalHistorySchema
);