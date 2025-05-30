const Charger = require("../models/Charger");

const getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCharger = async (req, res) => {
  try {
    const charger = await Charger.create({ ...req.body, createdBy: req.userId });
    res.status(201).json(charger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCharger = async (req, res) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(charger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCharger = async (req, res) => {
  try {
    await Charger.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllChargers, createCharger, updateCharger, deleteCharger };
