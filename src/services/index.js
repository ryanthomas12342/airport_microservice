const checkFunction = require("./sqslistener");

module.exports = {
  AirplaneService: require("./airplane"),
  CityService: require("./city"),
  AirportService: require("./airport"),
  FlightService: require("./flight"),
  checkFunction,
};
