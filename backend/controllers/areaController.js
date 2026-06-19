const Area = require("../models/area");

const createArea = async (req, res) => {
  try {
    const area = await Area.create(req.body);

    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();

    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateArea = async (req, res) => {
  try {
    const area = await Area.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!area) {
      return res.status(404).json({
        message: "Area not found",
      });
    }

    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);

    if (!area) {
      return res.status(404).json({
        message: "Area not found",
      });
    }

    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteArea = async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);

    if (!area) {
      return res.status(404).json({
        message: "Area not found",
      });
    }

    res.status(200).json({
      message: "Area deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArea,
  getAreas,
  getArea,
  updateArea,
  deleteArea,
};


