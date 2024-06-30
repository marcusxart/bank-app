const Joi = require("joi");
const AppError = require("../exceptions/errors");
const constants = require("../config/constants");

const createAccountValidationMiddleware = (req, res, next) => {
  const createAccountSchema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
      "string.min": "First name must be at least 3 characters long.",
      "string.empty": "First name is required.",
    }),
    lastName: Joi.string().min(3).required().messages({
      "string.min": "Last name must be at least 3 characters long.",
      "string.empty": "Last name is required.",
    }),
    phoneNumber: Joi.string().min(3).required().messages({
      "string.min": "Phone number must be at least 3 characters long.",
      "string.empty": "Phone number is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:<>?\\[\\]|;'\",./`~\\-]).{8,}$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include one uppercase letter, and one special character.",
        "string.empty": "Password is required.",
      }),
    verifiedEmail: Joi.boolean(),
    avatar: Joi.string().uri().allow(null),
    gender: Joi.string()
      .valid(...constants.USER.GENDER)
      .required()
      .messages({
        "any.only": `Gender must be one of the following values: ${constants.USER.GENDER.join(
          ", "
        )}.`,
        "string.empty": "Gender is required.",
      }),
  });
  const { error, value } = createAccountSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 403);
  }
  req.data = value;
  next();
};

module.exports = {
  createAccountValidationMiddleware,
};
