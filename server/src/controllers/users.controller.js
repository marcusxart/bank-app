const asyncHandler = require("express-async-handler");

const filterSortPaginate = require("../utils/filterSortPaginate");
const { USER } = require("../config/constants");
const db = require("../database/models");
const AppError = require("../exceptions/errors");

const userAttributes = {
  attributes: {
    exclude: USER.EXCLUDES,
  },
  include: {
    model: db.accounts,
    attributes: { exclude: ["userId", "id"] },
  },
};

exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await db.users.findOne({
    ...userAttributes,
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  res.status(200).send({
    status: "success",
    results: user,
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await db.users.findOne({
    ...userAttributes,
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  res.status(200).send({
    status: "success",
    results: user,
  });
});

exports.userTransactions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const results = await filterSortPaginate(
    db.transactions,
    ["paginate"],
    { where: { userId: id } },
    req.query
  );

  if (!accounts) {
    throw new AppError("Account not found for the provided user ID.", 400);
  }

  res.status(200).send({
    status: "success",
    results,
  });
});

exports.userOverview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const accounts = await db.accounts.findAll({
    where: { userId: id },
    attributes: ["balance", "currency"],
  });

  if (!accounts || accounts.length === 0)
    throw new AppError("No accounts found for the provided user ID.", 400);

  const recentTransactions = await db.transactions.findAll({
    where: { userId: id },
    order: [["createdAt", "DESC"]],
    limit: 8,
  });

  if (!recentTransactions)
    throw new AppError(
      "No recent transactions found for the provided user ID.",
      400
    );

  const transactionVolume = await db.transactions.sum("amount", {
    where: { userId: id },
  });

  if (transactionVolume === null)
    throw new AppError(
      "Could not calculate transaction volume for the provided user ID.",
      400
    );

  res.status(200).send({
    transactionVolume,
    accounts,
    recentTransactions,
  });
});
