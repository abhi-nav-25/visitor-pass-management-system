const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Visitor", visitorSchema);