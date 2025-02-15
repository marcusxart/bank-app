const AppError = require("../utils/errors");

const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    const firstErrorMessage = errors[0].message;
    throw new AppError(firstErrorMessage, 400, errors);
  }

  req.data = result.data; // Store validated data for further use
  next();
};

module.exports = validateRequest;
