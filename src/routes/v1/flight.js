const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

const router = require("express").Router();

router.post(
  "/",
  FlightMiddleware.validateFlight,
  FlightController.createFlight
);

router.get("/", FlightController.getAllFlights);

module.exports = router;
