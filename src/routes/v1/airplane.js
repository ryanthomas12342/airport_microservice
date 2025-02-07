const express = require("express");
const { AirplaneController } = require("../../controllers");
const router = express.Router();

const { CheckMiddleware } = require("../../middlewares");
const { getAllAirplanes } = require("../../controllers/airplane");

router.post(
  "/",
  CheckMiddleware.validateBody,
  AirplaneController.createAirplane
);

router.get("/", getAllAirplanes);

module.exports = router;
