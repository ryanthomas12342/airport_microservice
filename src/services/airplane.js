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
module.exports = { createAirplane, getAirplanes };
