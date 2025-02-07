const { StatusCodes } = require("http-status-codes");
const { SuccessMessage, ErrorMessage } = require("../utils/common");

const { CityService } = require("../services");
const AppError = require("../utils/errors/apperror");

const createCity = async (req, res) => {
  try {
    const resp = await CityService.createCity({ name: req.body.name });

    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    res.status(err.statusCode).send(ErrorMessage);
  }
};
const deleteCity = async (req, res) => {
  try {
    const resp = await CityService.deleteCity(req.params.id);

    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).json(SuccessMessage);
  } catch (err) {
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    res.status(err.statusCode).send(ErrorMessage);
  }
};

module.exports = {
  createCity,
  deleteCity,
};
