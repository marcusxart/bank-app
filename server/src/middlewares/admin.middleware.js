const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const AppError = require("../exceptions/errors");
const db = require("../database/models");

const adminMiddleware = (allowedRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new AppError("Authentication token missing", 401);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await db.admins.findOne({
      where: { id: decodedToken.id },
    });

    if (!admin) {
      throw new AppError("Admin not found", 404);
    }

    if (!allowedRoles.includes(admin.role)) {
      throw new AppError("Forbidden: Insufficient permissions", 403);
    }
    req.admin = admin;
    next();
  });
};

module.exports = adminMiddleware;
