// const airplane = require("../models/airplane");
const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AirplaneRepository } = require("../repositories/index");

const airplane = new AirplaneRepository();
const AppError = require("../utils/errors/apperror");
const createAirplane = async (data) => {
  try {
    console.log(data);
    const resp = await airplane.create(data);
    return resp;
  } catch (err) {
    if (err.name == "TypeError") {
      throw new AppError(
        "Cannot create a new Airplane object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    if (err.name == "SequelizeValidationError") {
      explanation = [];
      err.errors.forEach((e) => {
        explanation.push(e.message);
      });
      console.log(explanation);

      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};

const getAirplanes = async () => {
  try {
    const resp = await airplane.getAll();
    return resp;
  } catch (err) {
    throw AppError(
      "Cannot fetch data from db of airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplaneById = async (data) => {
  try {
    console.log("hello");
    const resp = await airplane.get(data);

    console.log(resp);
    return resp;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Could not retrieve the airplanes with this id",
        StatusCodes.NOT_FOUND
      );
    }
    console.log(err);
    throw new AppError(
      `Could not get airplane with id :${data}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirplane = async (data) => {
  try {
    const resp = await airplane.destroy(data);

    return resp;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND)
      throw new AppError(err.explanation, err.statusCode);

    throw new AppError(
      "Something went wrong while trying to delete",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplaneById,
  destroyAirplane,
};
