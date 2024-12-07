const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const moment = require("moment");

const db = require("../database/models");
const AppError = require("../exceptions/errors");

exports.verifyOtp = (type, callbackFunc) => {
  return asyncHandler(async (req, res, next) => {
    const { code, email } = req.query;

    if (!code || !email) {
      throw new AppError("Missing required parameters.", 400);
    }

    const user = await db.users.findOne({ where: { email } });
    if (!user) {
      throw new AppError("User with this email does not exist.", 404);
    }

    const otp = await db.otp.findOne({
      where: {
        code,
        userId: user.id,
        type,
        expiry: {
          [Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      },
    });

    if (!otp) {
      throw new AppError("Invalid or expired verification code", 403);
    }
    if (callbackFunc) {
      db.sequelize.transaction(async (t) => {
        req.user = {
          id: user.id,
          email: user.email,
          verifiedEmail: user.verifiedEmail,
        };
        callbackFunc(req, res, next, t);
        await otp.destroy({ transaction: t });
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Code is valid.",
      });
    }
  });
};
