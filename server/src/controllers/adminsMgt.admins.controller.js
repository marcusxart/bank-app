const asyncHandler = require("express-async-handler");

const AppError = require("../exceptions/errors");
const { hashPassword } = require("../utils/hashPassword");
const constants = require("../config/constants");
const filterSortPaginate = require("../utils/filterSortPaginate");
const db = require("../database/models");

const artributes = {
  attributes: {
    exclude: constants.USER.EXCLUDES,
  },
};

exports.createAdmin = asyncHandler(async (req, res) => {
  const data = req.data;
  const { email } = data;

  const user = await db.users.findOne({
    where: { email },
  });

  if (user) {
    throw new AppError(
      "A user with this email already exists and cannot be an admin.",
      422
    );
  }

  const foundAdmin = await db.admins.findOne({
    where: { email },
  });

  if (foundAdmin) {
    throw new AppError("Admin already exist.", 403);
  }

  data.password = await hashPassword(data.password);

  await db.sequelize.transaction(async (t) => {
    await db.admins.create(data, { transaction: t });

    res.status(201).send({
      status: "success",
      message: "Admin was created successfully.",
    });
  });
});

exports.getRoles = asyncHandler(async (req, res) => {
  res.status(200).send({
    status: "success",
    results: constants.ADMIN_ROLES,
  });
});

exports.getAllAdmins = asyncHandler(async (req, res) => {
  const results = await filterSortPaginate(
    db.admins,
    ["paginate"],
    artributes,
    req.query
  );
  res.status(200).send({
    status: "success",
    results,
  });
});

exports.getAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await db.admins.findOne({
    ...artributes,
    where: { id },
  });

  if (!admin) {
    throw new AppError("Admin not found.", 404);
  }

  res.status(200).send({
    status: "success",
    results: admin,
  });
});

exports.deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await db.admins.findOne({
    where: { id },
  });

  if (!admin) {
    throw new AppError("Admin not found.", 404);
  }

  db.sequelize.transaction(async (t) => {
    await db.admins.destory({ while: { id }, transaction: t });
    res.status(204).send({
      status: "success",
      message: "Admin was deleted successfully.",
    });
  });
});

exports.changeAdminRoles = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.data;

  const admin = await db.admins.findOne({
    where: { id },
  });

  if (!admin) {
    throw new AppError("Admin not found.", 404);
  }

  db.sequelize.transaction(async (t) => {
    await db.admins.update({ role }, { where: { id }, transaction: t });

    res.status(200).send({
      status: "success",
      message: "Admin roles was changed successfully.",
    });
  });
});
