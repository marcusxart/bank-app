const asyncHandler = require("express-async-handler");
const moment = require("moment");
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
        currency: "USD",
      },
      { transaction: t }
    );
    // const otp = await createOTP(user.id, "email.verification", t);

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
    const otp = await createOTP(user.id, "email.verification", t, 10);

    // send a mail later

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email?token=${otp.code}&email=${email}`;

    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      code: otp.code,
      url: verificationUrl,
    });
  });
});

exports.confirmEmailVerification = asyncHandler(async (req, res) => {
  const { code, email } = req.query;

  if (!code || !email) {
    throw new AppError("Missing required parameters.", 400);
  }

  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User with this email does not exist.", 404);
  }

  const otp = await db.otp.findOne({
    where: {
      code,
      userId: user.id,
      type: "email.verification",
      expiry: {
        [Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
  });

  if (!otp) {
    throw new AppError("Invalid or expired verification code", 403);
  }

  await db.sequelize.transaction(async (t) => {
    await user.update(
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

    await otp.destroy({ transaction: t });

    // send successfull mail
    res.status(200).send({
      status: "success",
      message: "Email verification successful!",
    });
  });
});

exports.resendEmailOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await db.users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.verifiedEmail)
    res.status(201).send({
      status: "success",
      message: "Your email has already been verified.",
    });

  await db.sequelize.transaction(async (t) => {
    await createOTP(user.id, "email.verification", t);
  });

  res.status(201).send({
    status: "success",
    message: "Please check your email for verification code",
  });
});

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

    // later i will send a mail
    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      code: tokenResult.code,
    });
  });
});

exports.verifyOtp = (type) => {
  return asyncHandler(async (req, res) => {
    const { email, code } = req.query;

    if (!code || !email) {
      throw new AppError("Missing required parameters.", 400);
    }

    const user = await db.users.findOne({ where: { email } });
    if (!user) {
      throw new AppError("User with this email does not exist.", 404);
    }

    const otp = await db.otp.findOne({
      where: {
        userId: user.id,
        code,
        type,
        expiry: {
          [Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      },
    });

    if (!otp) {
      throw new AppError("Invalid or expired verification code", 403);
    }

    res.status(200).json({
      status: "success",
      message: "OTP is valid.",
    });
  });
};

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.data;

  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError("User with this email does not exist.", 404);
  }

  const otp = await db.otp.findOne({
    where: {
      userId: user.id,
      code,
      type: "password.recovery",
      expiry: {
        [Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
  });

  if (!otp) {
    throw new AppError("Invalid or expired verification code", 403);
  }

  const hashNewPassword = await hashPassword(newPassword);

  await db.sequelize.transaction(async (t) => {
    await user.update({ password: hashNewPassword }, { transaction: t });
    await db.otp.destroy({ where: { id: otpRecord.id }, transaction: t });

    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully!",
    });
  });
});
