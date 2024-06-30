const Joi = require("joi");
const AppError = require("../exceptions/errors");
const joiConfig = require("../config/joiConfig");

const joiHandler = (data, req, next) => {
  if (data) {
    const schema = Joi.object(data);
    const { body } = req;
    const { error, value } = schema.validate(body);

    if (error) {
      throw new AppError(error.details[0].message, 403);
    }

    req.data = value;
    next();
  }
};

module.exports = {
  // validating adding of funds
  addFunds: (req, res, next) => {
    joiHandler(
      {
        amount: joiConfig.amount,
        currency: joiConfig.currency,
      },
      req,
      next
    );
  },

  // validating email and password
  emailPassword: (req, res, next) => {
    joiHandler(
      {
        email: joiConfig.email,
        password: joiConfig.password,
      },
      req,
      next
    );
  },

  email: (req, res, next) => {
    joiHandler(
      {
        email: joiConfig.email,
      },
      req,
      next
    );
  },

  // validate role
  role: (req, res, next) => {
    joiHandler(
      {
        role: joiConfig.role,
      },
      req,
      next
    );
  },

  // validate admin
  admin: (req, res, next) => {
    joiHandler(
      {
        email: joiConfig.email,
        password: joiConfig.password,
        role: joiConfig.role,
      },
      req,
      next
    );
  },

  // validate otp
  otp: (req, res, next) => {
    joiHandler(
      {
        email: joiConfig.email,
        code: joiConfig.code,
      },
      req,
      next
    );
  },

  // validate reset
  reset: (req, res, next) => {
    joiHandler(
      {
        email: joiConfig.email,
        code: joiConfig.code,
        newPassword: joiConfig.password,
      },
      req,
      next
    );
  },

  changePassword: (req, res, next) => {
    joiHandler(
      {
        password: joiConfig.password,
        newPassword: joiConfig.password,
      },
      req,
      next
    );
  },
};
