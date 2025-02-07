const { CityController } = require("../../controllers");

const router = require("express").Router();

router.post("/", CityController.createCity);

module.exports = router;
