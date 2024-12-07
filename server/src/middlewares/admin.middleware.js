const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const AppError = require("../exceptions/errors");
const db = require("../database/models");

const adminMiddleware = (allowedRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(
        "Token is missing. Please provide a valid token.",
        401
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError(
          "Your session has expired. Please log in again.",
          401
        );
      } else if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid token. Please log in again.", 401);
      } else {
        throw new AppError("Authentication failed. Please try again.", 401);
      }
    }

    const admin = await db.admins.findOne({
      where: { id: decodedToken.id },
    });

    if (!admin) {
      throw new AppError(
        "Admin account not found. Please check and try again.",
        403
      );
    }
    const hasRole =
      allowedRoles.length === 0 ||
      allowedRoles.includes(admin.role.toLowerCase());
    if (!hasRole) {
      throw new AppError("Forbidden: insufficient permissions.", 403);
    }
    req.admin = admin;
    next();
  });
};

module.exports = adminMiddleware;
