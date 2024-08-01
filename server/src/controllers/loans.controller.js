const asyncHandler = require("express-async-handler");
const generateUniqueId = require("generate-unique-id");

const db = require("../database/models");
const filterSortPaginate = require("../utils/filterSortPaginate");
const constants = require("../config/constants");
const AppError = require("../exceptions/errors");

exports.requestForLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.data;
  const user = await db.users.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  await db.sequelize.transaction(async (t) => {
    const referenceId = generateUniqueId({ length: 32 });
    await db.loans.create(
      { ...data, status: "pending", referenceId, userId: id },
      { transaction: t }
    );
    res.status(201).send({
      status: "success",
      message: "Your loan request has been successfully submitted.",
    });
  });
});

exports.loansHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const results = await filterSortPaginate(
    db.loans,
    ["paginate"],
    {
      where: { userId: user.id },
      attributes: {
        exclude: constants.USER.EXCLUDES,
      },
    },
    req.query
  );

  res.status(200).send({
    status: "success",
    results,
  });
});

exports.getLoanTypes = asyncHandler(async (req, res) => {
  res.status(200).send({
    status: "success",
    results: constants.LOAN.TYPES,
  });
});

exports.getLoanSchedule = asyncHandler(async (req, res) => {
  res.status(200).send({
    status: "success",
    results: constants.LOAN.SCHEDULE,
  });
});

exports.getLoans;
