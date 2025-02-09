const { AirportService } = require("../services/index");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/apperror");
const { AirportRepository } = require("../repositories");
const createAirport = async (req, res) => {
  try {
    const { name, code, address, city_id } = req.body;
    const airport = await AirportService.createAiport({
      name,
      code,
      address,
      city_id,
    });
    console.log(airport);
    SuccessMessage.data = airport;

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

const getAllAirports = async (req, res) => {
  try {
    const resp = await AiportController.getAllAirports();
    SuccessMessage.data = resp;
    return res.status(StatusCodes.OK).send(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const getAiportByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const resp = await AirportService.getAirportById(id);

    SuccessMessage.data = resp;
    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const deleteAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await AirportService.destroyAirport(id);

    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};
const updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await AirportService.updateAirport(req.body, id);

    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    console.log("helloo");
    console.log(err);
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};

module.exports = {
  createAirport,
  getAiportByID,
  getAllAirports,
  deleteAirport,
  updateAirport,
};
