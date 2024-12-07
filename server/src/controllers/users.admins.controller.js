const asyncHandler = require("express-async-handler");

const filterSortPaginate = require("../utils/filterSortPaginate");
const { USER } = require("../config/constants");
const db = require("../database/models");
const AppError = require("../exceptions/errors");
const { generateReferenceId } = require("../utils/referenceGen");
const { numberFormatter } = require("../utils/numberFormatter");
// const sendMail = require("../utils/mail");

const attributes = {
  exclude: USER.EXCLUDES,
};

const include = {
  model: db.accounts,
  attributes: { exclude: ["userId", "id"] },
};

exports.getAllUsers = asyncHandler(async (req, res) => {
  const results = await filterSortPaginate(
    db.users,
    ["paginate", { filter: ["email"] }],
    req.query,
    {},
    attributes,
    include
  );
  res.status(200).send({
    status: "success",
    results,
  });
});

exports.blockUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findOne({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.isBlocked) {
    throw new AppError("This user is already been blocked.", 400);
  }

  db.sequelize.transaction(async (t) => {
    await db.users.update(
      { isBlocked: true },
      { where: { id }, transaction: t }
    );
    res.status(200).send({
      status: "success",
      message: "User was blocked successfully.",
    });
  });
});

exports.unBlockUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!user.isBlocked) {
    throw new AppError("This user is already been unblocked.", 400);
  }

  db.sequelize.transaction(async (t) => {
    await db.users.update(
      { isBlocked: false },
      { where: { id }, transaction: t }
    );
    res.status(200).send({
      status: "success",
      message: "User was unblocked successfully.",
    });
  });
});

exports.sendMailToUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  res.status(200).send({
    status: "success",
    message: "Mail sent was successful.",
  });
});

exports.addFunds = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, currency } = req.data;

  const foundAccount = await db.accounts.findOne({
    where: { userId: id, currency },
  });

  if (!foundAccount) {
    throw new AppError(
      "Account not found for the provided a valid user ID.",
      400
    );
  }

  await db.sequelize.transaction(async (t) => {
    await db.accounts.update(
      {
        balance: foundAccount.balance + amount,
      },
      {
        where: { id: foundAccount.id },
        transaction: t,
      }
    );
    await db.transactions.create(
      {
        userId: id,
        status: "success",
        amount,
        description: "Account funding",
        currency: foundAccount.currency,
        referenceId: generateReferenceId(),
        type: "Credit",
      },
      { transaction: t }
    );
    res.status(200).send({
      status: "success",
      message: `Funds added successfully. Amount added: ${
        foundAccount.currency
      }${numberFormatter(amount)}.`,
    });
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await db.users.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }
  db.sequelize.transaction(async (t) => {
    await db.users.destroy({
      where: {
        id,
      },
      transaction: t,
    });
    res.status(204).send({
      status: "success",
      message: `User was deleted successful`,
    });
  });
});
