const Building = require("../models/building");

const createBuilding = async (req, res) => {
  try {
    const building = await Building.create(req.body);
    res.status(201).json(building);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find()
      .populate("area", "areaName areaCode");
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id)
      .populate("area", "areaName areaCode");
    if (!building) {
      return res.status(404).json({
        message: "Building not found",
      });
    }
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!building) {
      return res.status(404).json({
        message: "Building not found",
      });
    }
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(
      req.params.id
    );

    if (!building) {
      return res.status(404).json({
        message: "Building not found",
      });
    }
    res.status(200).json({
      message: "Building deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
};