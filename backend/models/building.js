const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Building", buildingSchema);