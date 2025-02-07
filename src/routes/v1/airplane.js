const express = require("express");
const { AirplaneController } = require("../../controllers");
const router = express.Router();

const { CheckMiddleware } = require("../../middlewares");
const { getAllAirplanes } = require("../../controllers/airplane");
const { validateRequest } = require("../../middlewares/airplane");

router.post(
  "/",
  CheckMiddleware.validateBody,
  AirplaneController.createAirplane
);

router.get("/:id", AirplaneController.getByID);

router.get("/", AirplaneController.getAllAirplanes);

router.delete("/:id", AirplaneController.deleteAirplane);
module.exports = router;
