const asyncHandler = require("express-async-handler");

const db = require("../database/models");
const AppError = require("../exceptions/errors");
const { hashPassword } = require("../utils/hashPassword");

exports.setupAdminControl = asyncHandler(async (req, res) => {
  const data = req.body;
  const role = "super-admin";

  const superAdmin = await db.admins.findOne({
    where: { role },
  });

  if (superAdmin) {
    throw new AppError("Sorry you can't perform this action.", 403);
  }

  data.password = await hashPassword(data.password);

  db.sequelize.transaction(async (t) => {
    await db.admins.create({ ...data, role }, { transaction: t });
    res.status(200).send({
      status: "success",
      message: "Setup was successful.",
    });
  });
});
