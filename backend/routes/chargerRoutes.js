const express = require("express");
const { getAllChargers, createCharger, updateCharger, deleteCharger } = require("../controllers/chargerController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllChargers);
router.post("/", auth, createCharger);
router.put("/:id", auth, updateCharger);
router.delete("/:id", auth, deleteCharger);

module.exports = router;
