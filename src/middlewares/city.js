const { StatusCodes } = require("http-status-codes");
const { ErrorMessage } = require("../utils/common");
const AppError = require("../utils/errors/apperror");

const checkCity = (req, res, next) => {
  if (!req.body.name) {
    ErrorMessage.error = new AppError(
      "City name cannot be null",
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }
  next();
};

module.exports = {
  checkCity,
};
