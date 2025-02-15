const asyncHandler = require("express-async-handler");
const AppError = require("../utils/errors");
const { Op } = require("sequelize");
const db = require("../database");
const { hashPassword, checkPassword } = require("../utils/hashPassword");
const { generateUserId, generateAccountNumber } = require("../utils/userSetup");
const mail = require("../utils/mail");
const { APP_NAME } = require("../../variables");
const { generateToken } = require("../utils/tokenGen");

exports.createUser = asyncHandler(async (req, res) => {
  const { personal, contact, account } = req.data;
  const { email, dialCode, phoneNo, firstName, lastName } = personal;
  const { type } = account;
  const existingUser = await db.users.findOne({
    where: {
      [Op.or]: [{ email }, { dialCode, phoneNo }],
    },
  });

  if (existingUser) {
    throw new AppError(
      "User already exists with the same email or phone number",
      409
    );
  }
  personal.password = await hashPassword(personal.password);
  personal.userCode = generateUserId(firstName, lastName);

  account.accountNumber = generateAccountNumber(type);

  await db.sequelize.transaction(async (t) => {
    const createdUser = await db.users.create(personal, { transaction: t });

    await db.accounts.create(
      { ...account, userId: createdUser.id },
      { transaction: t }
    );

    await db.contacts.create(
      { ...contact, userId: createdUser.id },
      { transaction: t }
    );

    await mail(
      { to: createdUser?.email, subject: `Welcome to ${APP_NAME}` },
      "welcome",
      { first_name: createdUser.firstName, user_id: createdUser.userCode }
    );

    res.status(201).send({
      status: "success",
      message:
        "Your bank account has been created successfully. You can now access all services.",
    });
  });
});

exports.signIn = asyncHandler(async (req, res) => {
  const { userId, password } = req.data;

  const user = await db.users.findOne({ where: { userCode: userId } });

  if (!user) {
    throw new AppError("User does not exist.", 404);
  }
  if (!(await checkPassword(password, user.password))) {
    throw new AppError("Invalid user id or password.", 401);
  }

  const userInfo = { id: user.id, email: user.email, userCode: user.userId };
  const accessToken = generateToken(userInfo);

  res.status(200).send({
    status: "success",
    message: "You've successfully logged in.",
    accessToken,
  });
});
