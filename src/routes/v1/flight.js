const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

const router = require("express").Router();

router.post(
  "/",
  FlightMiddleware.validateFlight,
  FlightController.createFlight
);

router.get("/:id", FlightController.getFlightById);

router.get("/", FlightController.getAllFlights);

router.patch("/:id", FlightController.updateFlights);

module.exports = router;
