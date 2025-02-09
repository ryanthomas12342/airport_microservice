const { AiportController } = require("../../controllers");
const { AiportMiddleware } = require("../../middlewares");

const router = require("express").Router();

router.post(
  "/",
  AiportMiddleware.validateAirport,
  AiportController.createAirport
);

module.exports = router;
