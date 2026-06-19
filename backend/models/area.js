const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
{
  areaName: {
    type: String,
    required: true,
  },

  areaCode: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);