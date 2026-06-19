const Gate = require("../models/gates");

const createGate = async (req, res) => {
  try {
    const gate = await Gate.create(req.body);

    res.status(201).json(gate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getGates = async (req, res) => {
  try {
    const gates = await Gate.find();

    res.status(200).json(gates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateGate = async (req, res) => {
  try {
    const gate = await Gate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!gate) {
      return res.status(404).json({
        message: "Gate not found",
      });
    }

    res.status(200).json(gate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGate = async (req, res) => {
  try {
    const gate = await Gate.findById(req.params.id);

    if (!gate) {
      return res.status(404).json({
        message: "Gate not found",
      });
    }

    res.status(200).json(gate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGate = async (req, res) => {
  try {
    const gate = await Gate.findByIdAndDelete(req.params.id);

    if (!gate) {
      return res.status(404).json({
        message: "Gate not found",
      });
    }

    res.status(200).json({
      message: "Gate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGate,
  getGates,
  getGate,
  updateGate,
  deleteGate,
};


