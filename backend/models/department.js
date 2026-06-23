const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
{
  departmentName: {
    type: String,
    required: true,
  },

  departmentCode: {
    type: String,
    required: true,
    unique: true,
  },

  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model(
  "Department",
  departmentSchema
);