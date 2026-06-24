const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
    passType: {
        type: String,
        enum: ["visitor", "worker"],
        required: true
    },

    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor"
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker"
    },

    qrCode: {
        type: String
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    expiryDate: {
        type: Date,
        index:true,
        required: true
    },

    status: {
        type: String,
        index:true,
        enum: ["active", "expired", "blocked"],
        default: "active"
    }
});

module.exports = mongoose.model("Pass", passSchema);