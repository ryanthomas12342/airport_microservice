const CrudRepo = require("./crud");
const { flight } = require("../models/index");

class FlightRepository extends CrudRepo {
  constructor() {
    super(flight);
  }

  async getFlights(filter, sortFilter) {
    console.log("cjewnckj");

    const resp = await flight.findAll({
      where: filter,
      order: sortFilter,
    });
    // console.log(resp);
    return resp;
  }
}

module.exports = FlightRepository;
