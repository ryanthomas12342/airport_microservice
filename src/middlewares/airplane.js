const { StatusCodes } = require("http-status-codes");
const { SuccessMessage, ErrorMessage } = require("../utils/common");
const AppError = require("../utils/errors/apperror");

const validateBody = (req, res, next) => {
  if (!req.body.modelNumber) {
    ErrorMessage.message = "Something went wrong while creating the airplane";
    ErrorMessage.error = new AppError(
      ["Model Number not found in the request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorMessage);
  }

  next();
};

module.exports = {
  validateBody,
};
