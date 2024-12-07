const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../database/models");

const AppError = require("../exceptions/errors");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Token is missing. Please provide a valid token.", 401);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Your session has expired. Please log in again.", 401);
    } else if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token. Please log in again.", 401);
    } else {
      throw new AppError("Authentication failed. Please try again.", 401);
    }
  }

  const user = await db.users.findOne({ where: { id: decodedToken.id } });

  if (!user) {
    throw new AppError(
      "Account not found. Please check your login details.",
      403
    );
  }
  req.user = user;
  next();
});

module.exports = verifyJWT;
