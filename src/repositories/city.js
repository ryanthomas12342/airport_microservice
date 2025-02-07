const CrudRepo = require("./crud");
const { City } = require("../models/index");

class CityRepository extends CrudRepo {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;
