const asyncHandler = require("express-async-handler");
const db = require("../database/models");
const AppError = require("../exceptions/errors");
const { generateReferenceId } = require("../utils/referenceGen");

exports.transferToOtherBank = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.data;
  const { amount } = data;

  const senderAccount = await db.accounts.findOne({ where: { userId: id } });
  if (!senderAccount) {
    throw new AppError("Invalid account", 400);
  }
  if (amount <= 0) {
    throw new AppError("Invalid transfer amount.", 400);
  }
  if (senderAccount.balance < amount) {
    throw new AppError("Insufficient funds.", 400);
  }

  await db.sequelize.transaction(async (t) => {
    await db.accounts.decrement("balance", {
      by: amount,
      where: {
        id: senderAccount.id,
      },
      transaction: t,
    });

    await db.transactions.create(
      {
        userId: id,
        status: "pending",
        amount,
        type: "transfer",
        referenceId: generateReferenceId(),
        currency: senderAccount.currency,
        description: `Transferring ${amount} in ${senderAccount.currency.toUpperCase()} to the account at ${
          data.bankName
        }, account number ${data.accountNumber}.`,
      },
      {
        transaction: t,
      }
    );

    res.status(200).send({
      status: "success",
      message: "Your transfer is being processed.",
    });
  });
});

exports.rejectOtherBankTransfer = asyncHandler(async (req, res) => {
  const { referenceId, userId } = req.query;

  if (!referenceId || !userId) {
    throw new AppError("Missing referenceId or userId parameter.", 400);
  }

  const senderAccount = await db.accounts.findOne({ where: { userId } });
  if (!senderAccount) {
    throw new AppError("Can not find user account.", 404);
  }
  const mainTranasction = await db.transaction.findOne({
    where: { referenceId },
  });
  await db.sequelize.transaction(async (t) => {
    await db.accounts.increment("balance", {
      by: mainTranasction.amount,
      where: {
        id: senderAccount.idm,
      },
      transaction: t,
    });

    await db.transactions.update(
      { status: "failed" },
      { where: { id: mainTranasction.id }, transaction: t }
    );

    await db.transactions.create(
      {
        userId,
        status: "refunded",
        amount: mainTranasction.amount,
        type: "transfer",
        referenceId: generateReferenceId(),
        currency: senderAccount.currency,
        description: `Refund of ${senderAccount.currency.toUpperCase()} to your account.`,
      },
      {
        transaction: t,
      }
    );

    res.status(200).send({
      status: "success",
      message: "The transaction has been rejected.",
    });
  });
});

exports.acceptOtherBankTransfer = asyncHandler(async (req, res) => {
  const { referenceId, userId } = req.query;

  if (!referenceId || !userId) {
    throw new AppError("Missing referenceId or userId parameter.", 400);
  }

  const senderAccount = await db.accounts.findOne({ where: { userId } });
  if (!senderAccount) {
    throw new AppError("Can not find user account.", 404);
  }
  const mainTranasction = await db.transaction.findOne({
    where: { referenceId },
  });
  await db.sequelize.transaction(async (t) => {
    await db.transactions.update(
      { status: "successful" },
      { where: { id: mainTranasction.id }, transaction: t }
    );

    res.status(200).send({
      status: "success",
      message: "The transaction has been accepted.",
    });
  });
});
