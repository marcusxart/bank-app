const Joi = require("joi");
const constants = require("./constants");

module.exports = {
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
  amount: Joi.number().min(10).required().messages({
    "number.min": "Amount must be at least 10.",
    "any.required": "Amount is required.",
  }),
  code: Joi.string().length(4).required().messages({
    "string.length": "code must be exactly 4 digits.",
    "string.empty": "code is required.",
    "any.required": "code is required.",
  }),
  currency: Joi.string()
    .required()
    .valid(...constants.CURRENCY)
    .messages({
      "any.only": `Currency must be one of ${constants.CURRENCY.join(", ")}.`,
      "any.required": "Currency is required.",
    }),
  role: Joi.string()
    .valid(...constants.ADMIN_ROLES_VALUES)
    .required()
    .messages({
      "any.only": `Role must be one of ${constants.ADMIN_ROLES_VALUES.join(
        ", "
      )}.`,
      "any.required": "Role is required.",
    }),
  loanTypes: Joi.string()
    .valid(...constants.LOAN.TYPES)
    .required()
    .messages({
      "any.only": `Loan must be one of ${constants.LOAN.TYPES.join(", ")}.`,
      "any.required": "Loan is required.",
    }),
  requiredText: Joi.string().required().max(300).message({
    "any.required": "Field is required.",
    "string.max": "Field must not exceed 300 characters.",
  }),
  date: Joi.date().min("now").required().messages({
    "date.base": "The date must be a valid date",
    "date.min": "The date must be today or in the future",
    "any.required": "The date is required",
  }),
  schedule: Joi.string()
    .valid(...constants.LOAN.SCHEDULE)
    .required()
    .messages({
      "any.only": `Schedule must be one of ${constants.LOAN.SCHEDULE.join(
        ", "
      )}.`,
      "any.required": "Schedule is required.",
    }),
};
