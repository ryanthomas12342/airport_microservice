const { AirportController, AirplaneController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
const { route } = require("./airplane");

const router = require("express").Router();

router.post(
  "/",
  AirportMiddleware.validateAirport,
  AirportController.createAirport
);

router.get("/", AirportController.getAllAirports);
router.get("/:id", AirportController.getAiportByID);

router.delete("/:id", AirportController.deleteAirport);
router.patch("/:id", AirportController.updateAirport);

module.exports = router;
