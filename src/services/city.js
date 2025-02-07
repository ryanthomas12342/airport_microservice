const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/apperror");

const City = new CityRepository();

const createCity = async (data) => {
  try {
    const resp = await City.create(data);

    return resp;
  } catch (err) {
    console.log(err);

    if (
      err.name == "SequelizeValidationError" ||
      err.name == "SequelizeUniqueConstraintError"
    ) {
      explanation = [];
      err.errors.forEach((e) => explanation.push(e.message));
      console.log(explanation);

      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }

    throw new AppError(
      "failed to create a city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteCity = async (data) => {
  try {
    const resp = await City.destroy(data);

    return resp;
  } catch (err) {
    console.log(err);

    throw new AppError(
      "failed to  delete city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createCity,
  deleteCity,
};
