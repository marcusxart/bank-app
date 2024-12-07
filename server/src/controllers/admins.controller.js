const asyncHandler = require("express-async-handler");

const AppError = require("../exceptions/errors");
const { hashPassword } = require("../utils/hashPassword");
const db = require("../database/models");

exports.createAdmin = asyncHandler(async (req, res) => {
  const data = req.data;
  const { email, role } = data;

  if (role === "super-admin") {
    const superAdminExists = await db.admins.findOne({
      where: { role: "super-admin" },
    });

    if (superAdminExists) {
      throw new AppError("There can only be one super admin.", 400);
    }
  }

  const user = await db.admins.findOne({
    while: { email },
  });

  if (user) {
    throw new AppError(
      "A user with this email already exists and cannot be an admin.",
      422
    );
  }

  const foundAdmin = db.admins.findOnc({
    while: { email },
  });

  if (foundAdmin) {
    throw new AppError("Admin already exist.", 403);
  }

  data.password = hashPassword(data.password);

  await db.sequelize.transaction(async (t) => {
    await db.admins.create(data, { transaction: t });

    res.status(201).send({
      status: "success",
      message: "Admin was created successfully.",
    });
  });
});
