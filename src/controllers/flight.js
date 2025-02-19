const { FlightService } = require("../services/index");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/apperror");
const createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airplaneID,
      arrivalAirportId,
      departureAirportId,
      arrivalTime,
      departureTime,
      price,
      boardingGate,
      totalSeats,
    } = req.body;
    const flight = await FlightService.createFlight({
      flightNumber,
      airplaneID,
      arrivalAirportId,
      departureAirportId,
      arrivalTime,
      departureTime,
      price,
      boardingGate,
      totalSeats,
    });
    console.log(flight);
    SuccessMessage.data = flight;

    return res.status(StatusCodes.CREATED).json(SuccessMessage);
  } catch (err) {
    // ErrorMessage.error = `this went wrong ${err}`;
    // if (
    //   err.name === "SequelizeDatabaseError" ||
    //   err.name === "SequelizeValidationError"
    // ) {
    //   ErrorMessage.error =
    //     "Validation failed: Capacity must be between 1 and 1000.";
    //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
    // }
    console.log(err);
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const getAllFlights = async (req, res) => {
  try {
    const resp = await FlightService.getAllFlights(req.query);

    // console.log("thi is it", resp);

    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await FlightService.getFlight(id);
    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const updateFlights = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("hello this is the id wow", id);
    const resp = FlightService.updateFlight(id, req.body);
    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).send(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};
module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlights,
};
