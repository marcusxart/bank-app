const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../database/models");
const { generateToken } = require("../utils/tokenGen");
const AppError = require("../exceptions/errors");
const { COOKIE_OPTIONS } = require("../config/constants");

exports.handleRefreshToken = (dbName) =>
  asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies["refresh"]) {
      throw new AppError("Authentication required.", 401);
    }

    const refreshToken = cookies["refresh"];
    const data = await db[dbName].findOne({ where: { refreshToken } });

    if (!data) {
      throw new AppError("Access denied.", 403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          throw new AppError("Invalid refresh token.", 403); // More specific error
        }
        if (data.id !== decoded.id) {
          throw new AppError("Authentication failed.", 401);
        }
        const accessToken = generateToken({
          id: decoded.id,
          email: decoded.email,
        });

        res.status(200).send({
          status: "success",
          accessToken,
        });
      }
    );
  });

exports.handleLogout = (dbName) =>
  asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.refresh) {
      throw new AppError("Access denied. Please log in.", 403);
    }

    const refreshToken = cookies.refresh;

    const data = await db[dbName].findOne({ where: { refreshToken } });

    if (!data) {
      res.clearCookie(COOKIE_OPTIONS.NAME, {
        ...COOKIE_OPTIONS.OPTIONS,
        maxAge: undefined,
      });
      return res.status(204).send({
        status: "success",
        message: "Logout successful",
      });
    }
    await db.sequelize.transaction(async (t) => {
      await db[dbName].update(
        {
          refreshToken: null,
        },
        {
          where: {
            id: data.id,
          },
          transaction: t,
        }
      );
    });
    res.clearCookie(COOKIE_OPTIONS.NAME, COOKIE_OPTIONS.OPTIONS);

    res.status(204).send({
      status: "success",
      message: "Logout successful",
    });
  });
