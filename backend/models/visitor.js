const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index:true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      index:true,
      trim: true,
    },

    purpose: {
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
      index:true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);