const { StatusCodes } = require("http-status-codes");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const AppError = require("../utils/errors/apperror");

const validateAirport = (req, res, next) => {
  console.log("this is the body", req);
  if (!req.body.name) {
    ErrorMessage.message = "Something went wrong while creating the airport";
    ErrorMessage.error = new AppError(
      ["name not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.code) {
    ErrorMessage.message = "Something went wrong while creating the code";
    ErrorMessage.error = new AppError(
      ["code not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  if (!req.body.city_id) {
    ErrorMessage.message =
      "Something went wrong while creating the airport city_id";
    ErrorMessage.error = new AppError(
      ["city_id not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }

  next();
};

// const validateRequest = (req, res, next) => {
//   const { id } = req.params;
//   const { method } = req.method;
//   console.log(method);

//   if (id === undefined) {
//     ErrorMessage.error = `The id wasnt provided to do the ${method} operation`;
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
//   }
//   next();
// };

module.exports = {
  validateAirport,
};
