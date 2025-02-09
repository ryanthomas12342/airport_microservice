const { createAirplane } = require("./airplane");

module.exports = {
  infoController: require("./info"),
  AirplaneController: require("./airplane"),
  CityController: require("./city"),
  AirportController: require("./airport"),
  FlightController: require("./flight"),
};
