const { CityController } = require("../../controllers");
const { CityMiddlerware } = require("../../middlewares");

const router = require("express").Router();

router.post("/", CityMiddlerware.checkCity, CityController.createCity);

router.delete("/:id", CityController.deleteCity);
module.exports = router;
