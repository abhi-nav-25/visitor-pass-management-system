const mongoose=require("mongoose");

const entryExitLogSchema = new mongoose.Schema(
    {
        pass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pass",
            required: true
        },
        entryTime: {
            type: Date,
            required: true
        },
        exitTime: {
            type: Date
        },
        status:{
            type: String,
            enum: ["inside","outside"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("EntryExitLog",entryExitLogSchema);