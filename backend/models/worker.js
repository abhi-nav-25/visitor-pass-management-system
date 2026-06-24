const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    idProofType: {
      type: String,
      required: true,
      enum: [
        "Aadhaar",
        "PAN",
        "Driving License",
        "Passport",
        "Voter ID",
        "Other",
      ],
    },

    idProofNumber: {
      type: String,
      required: true,
      trim: true,
    },

    personPhoto: {
      type: String,
      default: "",
    },

    idProofPhoto: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Worker", workerSchema);