const express = require("express");
const { infoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane");
const cityRoutes = require("./city");

router.use("/city", cityRoutes);

router.use("/airplanes", airplaneRoutes);

router.get("/info", infoController.info);

module.exports = router;
