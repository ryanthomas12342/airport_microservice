const { AirplaneService } = require("../services/index");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/apperror");
const createAirplane = async (req, res) => {
  try {
    const { modelNumber, capacity } = req.body;
    console.log(modelNumber, capacity);
    const airplane = await AirplaneService.createAirplane({
      modelNumber,
      capacity,
    });
    console.log(airplane);
    SuccessMessage.data = airplane;

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
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const getAllAirplanes = async (req, res) => {
  try {
    const resp = await AirplaneService.getAirplanes();
    SuccessMessage.data = resp;
    return res.status(StatusCodes.OK).send(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);

    return res.status(err.statusCode).json(ErrorMessage);
  }
};

module.exports = {
  createAirplane,
  getAllAirplanes,
};
