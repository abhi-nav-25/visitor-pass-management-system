const mongoose = require("mongoose");

const gateSchema = new mongoose.Schema(
  {
    gateName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gateCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gate", gateSchema);