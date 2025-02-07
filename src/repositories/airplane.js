const CrudRepo = require("./crud");
const { Airplane } = require("../models/index");

class AirplaneRepository extends CrudRepo {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
