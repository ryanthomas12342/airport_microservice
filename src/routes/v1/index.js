const express = require("express");
const { infoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane");

router.use("/airplanes", airplaneRoutes);

router.get("/info", infoController.info);

module.exports = router;
