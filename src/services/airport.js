// const airplane = require("../models/airplane");
const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AirportRepository } = require("../repositories/index");

const airport = new AirportRepository();
const AppError = require("../utils/errors/apperror");

const createAiport = async (data) => {
  try {
    const resp = await airport.create(data);
    return resp;
  } catch (err) {
    console.log(err);
    if (err.name == "SequelizeValidationError") {
      explanation = [];
      err.errors.forEach((e) => {
        explanation.push(e.message);
      });
      console.log(explanation);

      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirports = async () => {
  try {
    console.log("hello");
    const resp = await airport.getAll();
    return resp;
  } catch (err) {
    console.log(err);

    throw new AppError(
      "Cannot fetch data from db of airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirportById = async (data) => {
  try {
    console.log("hello");
    const resp = await airport.get(data);

    console.log(resp);
    return resp;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Could not retrieve the airport with this id",
        StatusCodes.NOT_FOUND
      );
    }
    console.log(err);
    throw new AppError(
      `Could not get airport with id :${data}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirport = async (data) => {
  try {
    const resp = await airport.destroy(data);

    return resp;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND)
      throw new AppError(err.explanation, err.statusCode);

    throw new AppError(
      "Something went wrong while trying to delete the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
const updateAirport = async (data, id) => {
  try {
    const resp = await airport.update(data, id);

    return resp;
  } catch (err) {
    console.log(err);
    if (err.statusCode == StatusCodes.NOT_FOUND)
      throw new AppError(err.explanation, err.statusCode);

    throw new AppError(
      "Something went wrong while trying to update the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAiport,
  getAirportById,
  getAirports,
  destroyAirport,
  updateAirport,
};
