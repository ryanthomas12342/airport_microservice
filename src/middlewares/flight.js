const { StatusCodes } = require("http-status-codes");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const AppError = require("../utils/errors/apperror");

const validateFlight = (req, res, next) => {
  console.log("hellos");
  if (!req.body.flightNumber) {
    ErrorMessage.message = "Something went wrong while creating flight";
    ErrorMessage.error = new AppError(
      ["flightNumber not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.airplaneID) {
    ErrorMessage.message = "Something went wrong while creating the flight";
    ErrorMessage.error = new AppError(
      ["airplane Id not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }

  next();

  if (!req.body.departureAirportId) {
    ErrorMessage.message = "Something went wrong while  creating the flight";
    ErrorMessage.error = new AppError(
      ["departureAirportId not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.arrivalTime) {
    ErrorMessage.message = "Something went wrong while  creating the flight";
    ErrorMessage.error = new AppError(
      ["arrivalTime not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.departureTime) {
    ErrorMessage.message = "Something went wrong while  creating the flight";
    ErrorMessage.error = new AppError(
      ["departureTime not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.price) {
    ErrorMessage.message = "Something went wrong while  creating the flight";
    ErrorMessage.error = new AppError(
      ["price not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.totalSeats) {
    ErrorMessage.message = "Something went wrong while  creating the flight";
    ErrorMessage.error = new AppError(
      ["totalSeats not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
};
module.exports = {
  validateFlight,
};
