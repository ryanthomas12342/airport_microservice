const { CityController } = require("../../controllers");
const { CityMiddlerware } = require("../../middlewares");

const router = require("express").Router();

router.post("/", CityMiddlerware.checkCity, CityController.createCity);

module.exports = router;
