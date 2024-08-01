const asyncHandler = require("express-async-handler");
const db = require("../database/models");
const AppError = require("../exceptions/errors");
const { generateReferenceId } = require("../utils/referenceGen");

exports.transferToBank = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.data;
  const { amount } = data;

  const senderAccount = await db.accounts.findOne({ where: { userId: id } });
  const receiverAccount = await db.accounts.findOne({
    where: { accountNumber: data.receiverAccountNumber },
  });
  if (!senderAccount) {
    throw new AppError("Invalid Account", 400);
  }
  if (!receiverAccount) {
    throw new AppError("Receiver account not found.", 404);
  }
  if (amount <= 0) {
    throw new AppError("Invalid transfer amount.", 400);
  }
  if (senderAccount.balance < amount) {
    throw new AppError("Insufficient Funds.", 400);
  }

  const receiverUser = await db.users.findOne({
    where: { id: receiverAccount?.userId },
  });

  await db.sequelize.transaction(async (t) => {
    await db.accounts.decrement("balance", {
      by: amount,
      where: {
        id: senderAccount.id,
      },
      transaction: t,
    });

    await db.accounts.increment("balance", {
      by: amount,
      where: {
        id: receiverAccount.id,
      },
      transaction: t,
    });

    await db.transferBanks.create(
      {
        ...data,
        accountId: senderAccount.id,
      },
      {
        transaction: t,
      }
    );

    await db.transactions.create(
      {
        userId: id,
        status: "successful",
        amount,
        type: "transfer",
        referenceId: generateReferenceId(),
        currency: senderAccount.currency,
        description: `Transfer ${amount} in ${senderAccount.currency.toUpperCase()} to ${
          receiverUser.firstName
        } ${receiverUser.lastName}.`,
      },
      {
        transaction: t,
      }
    );

    res.status(200).send({
      status: "success",
      message: "Transfer successful",
    });
  });
});
