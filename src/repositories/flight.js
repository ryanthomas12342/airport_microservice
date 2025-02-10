const CrudRepo = require("./crud");
const {
  flight,
  Airport,
  Airplane,
  Sequelize,
  City,
} = require("../models/index");
const { where } = require("sequelize");

class FlightRepository extends CrudRepo {
  constructor() {
    super(flight);
  }

  async getFlights(filter, sortFilter) {
    console.log("cjewnckj");

    const resp = await flight.findAll({
      where: filter,
      order: sortFilter,
      //this is done to create joins on other tables
      include: [
        {
          model: Airplane,
          //required means inner join
          required: true,

          //as should be mentioned in model in model.belongsTo etc
          as: "airplaneDetails",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          //by default joins done on id..but airport need to be done on code not id so use on
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
            // col2:Sequelize.where(Sequelize.col('flight.arrivalAirportId'),"=",Sequelize.col(''))
          },
          include: [
            {
              model: City,
              required: true,
              as: "cityDetails",
            },
          ],
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          //by default joins done on id..but airport need to be done on code not id so use on
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.arrivalAirportId"),
              " =",
              Sequelize.col("arrivalAirport.code")
            ),
            // col2:Sequelize.where(Sequelize.col('flight.arrivalAirportId'),"=",Sequelize.col(''))
          },
          include: [
            {
              model: City,
              required: true,
              as: "cityDetails",
            },
          ],
        },
      ],
    });
    // console.log(resp);
    return resp;
  }
}

module.exports = FlightRepository;
