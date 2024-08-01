require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { hashPassword, checkPassword } = require("../utils/hashPassword");
const { createOTP } = require("../utils/optGen");
const { createAccountNumber } = require("../utils/accountNumberGen");
const { generateToken, generateRefreshToken } = require("../utils/tokenGen");
const { COOKIE_OPTIONS } = require("../config/constants");
const AppError = require("../exceptions/errors");
const db = require("../database/models");

exports.createUser = asyncHandler(async (req, res) => {
  const data = req.data;
  const { email, phoneNumber } = data;

  const user = await db.users.findOne({
    where: {
      [Op.or]: [{ email }, { phoneNumber }],
    },
  });

  if (user) {
    throw new AppError("User already exists", 409);
  }

  const accountNum = createAccountNumber();

  let account;
  while (true) {
    account = await db.accounts.findOne({
      where: { accountNumber: accountNum },
    });
    if (!account) break;
  }

  data.password = await hashPassword(data.password);

  await db.sequelize.transaction(async (t) => {
    const user = await db.users.create(data, { transaction: t });

    await db.accounts.create(
      {
        userId: user.id,
        balance: 0,
        accountNumber: accountNum,
        currency: "usd",
        stripeId: customer.id,
      },
      { transaction: t }
    );

    //  send otp to mail
    await sendMail(
      { to: user.email, subject: `Welcome ${user.firstName}` },
      "welcome",
      {
        user: user.firstName,
        loginLink: "google.com",
      }
    );
    res.status(201).send({
      status: "success",
      message: "Account created successfully.",
    });
  });
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Both email and password are required.", 400);
  }

  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!(await checkPassword(password, user.password))) {
    throw new AppError("Invalid email or password.", 400);
  }

  const userInfo = { id: user.id, email: user.email };
  const accessToken = generateToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);

  await db.sequelize.transaction(async (t) => {
    await db.users.update(
      {
        refreshToken,
      },
      {
        where: {
          email,
        },
        transaction: t,
      }
    );
    res.cookie(COOKIE_OPTIONS.NAME, refreshToken, COOKIE_OPTIONS.OPTIONS);
    res.status(200).send({
      status: "success",
      message: "You've successfully logged in.",
      access: accessToken,
    });
  });
});

exports.sendEmailVerification = asyncHandler(async (req, res) => {
  const { email } = req.data;
  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User with this email does not exist.", 404);
  }

  if (user.verifiedEmail) {
    res.status(201).send({
      status: "success",
      message: "Your email has already been verified.",
    });
  }

  await db.sequelize.transaction(async (t) => {
    const otpList = await db.otp.findAll({
      where: {
        type: "email.verification",
      },
    });
    if (otpList.length) {
      db.otp.destroy({
        where: {
          type: "email.verification",
        },
        transaction: t,
      });
    }
    const otp = await createOTP(user.id, "email.verification", t, 6);

    // send a mail later

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email?token=${otp.code}&email=${email}`;
    const devResult =
      process.env.NODE_ENV === "development"
        ? { code: otp.code, url: verificationUrl }
        : {};

    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      ...devResult,
    });
  });
});

exports.confirmEmailVerification = async (req, res, next, t) => {
  const user = req.user;
  await db.users.update(
    {
      verifiedEmail: true,
    },
    {
      where: {
        id: user.id,
      },
      transaction: t,
    }
  );
  res.status(200).send({
    status: "success",
    message: "Email verification successful!",
  });
};

exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.data;

  const user = await db.users.findOne({ where: { email } });
  if (!user) {
    throw new AppError("User with this email does not exist.", 404);
  }

  await db.sequelize.transaction(async (t) => {
    const otpList = await db.otp.findAll({
      where: {
        type: "password.recovery",
      },
    });
    if (otpList.length) {
      db.otp.destroy({
        where: {
          type: "password.recovery",
        },
        transaction: t,
      });
    }
    // Generate a reset token
    const tokenResult = await createOTP(user.id, "password.recovery", t);

    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      code:
        process.env.NODE_ENV === "development" ? tokenResult.code : undefined,
    });
  });
});

exports.resetPassword = async (req, res, next, t) => {
  const { newPassword } = req.data;
  const email = req.query.email;

  const user = await db.users.findOne({ where: { email } });

  if (await checkPassword(newPassword, user.password)) {
    next(
      new AppError("New password cannot be the same as the old password.", 400)
    );
  }

  const hashNewPassword = await hashPassword(newPassword);

  await user.update({ password: hashNewPassword }, { transaction: t });

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully!",
  });
};
