const logger = require("../utils/logger");
const { NODE_ENV } = require("../../variables");
const AppError = require("../utils/errors");

function errorHandler(err, req, res, next) {
  logger.log("error", err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors || [],
      stack: NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: "Something went wrong! Please try again later.",
    stack: NODE_ENV === "development" ? err.stack : undefined,
  });
}

module.exports = errorHandler;
