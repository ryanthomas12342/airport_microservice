const express = require("express");
const { infoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane");
const airportRoutes = require("./airport");
const cityRoutes = require("./city");
const flightRoutes = require("./flight");

router.use("/city", cityRoutes);

router.use("/airplanes", airplaneRoutes);

router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);
router.get("/info", infoController.info);

module.exports = router;
