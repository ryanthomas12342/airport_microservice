// const airplane = require("../models/airplane");
const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { FlightRepository } = require("../repositories/index");
const datetimecompare = require("../utils/helpers/datetimecompare");
const flight = new FlightRepository();
const AppError = require("../utils/errors/apperror");
const { Op } = require("sequelize");

const createFlight = async (data) => {
  try {
    const { arrivalTime, departureTime } = data;
    //see if arrival date is less than departure dat
    if (!datetimecompare(arrivalTime, departureTime)) {
      throw new AppError(
        "The arrivalTime is greater than the departure time which is invalid",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const resp = await flight.create(data);
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
      err.explanation || "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

//filter is used for querying all the needed queires

const getAllFlights = async (query) => {
  let filter = {};
  let sortfilter = [];
  if (query.trips) {
    [arrivalAirportId, departureAirportId] = query.trips.split("-");
    filter.departureAirportId = departureAirportId;
    filter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minimumPrice, maximumPrice] = query.price.split("-");
    filter.price = {
      [Op.between]: [
        minimumPrice ? Number(minimumPrice) : 500,
        maximumPrice ? Number(maximumPrice) : 20000,
      ],
    };
  }

  if (query.travellers) {
    filter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    filter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + " 23:59:00"],
    };
  }

  if (query.sort) {
    const list = query.sort.split(",");
    const temp = list.map((params) => params.split("_"));
    sortfilter = temp;
  }
  //   console.log(filter);
  console.log(sortfilter);
  try {
    // if (departureAirportId === arrivalAirportId) {
    //   throw new AppError(
    //     "Arrival and Departure Airports cannot be the same",
    //     StatusCodes.INTERNAL_SERVER_ERROR
    //   );
    // }

    const flights = await flight.getFlights(filter, sortfilter);
    console.log(filter);
    return flights;
  } catch (err) {
    throw new AppError(
      err.explanation || "Cannot fetch data from db of airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createFlight,
  getAllFlights,
};
