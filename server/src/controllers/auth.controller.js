require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const sendMail = require("../utils/mail");
const { hashPassword, checkPassword } = require("../utils/hashPassword");
const { createOTP } = require("../utils/optGen");
const { createAccountNumber } = require("../utils/accountNumberGen");
const { generateToken, generateRefreshToken } = require("../utils/tokenGen");
const { COOKIE_OPTIONS, ClIENT_URL } = require("../config/constants");
const AppError = require("../exceptions/errors");
const db = require("../database/models");

exports.createUser = asyncHandler(async (req, res) => {
  const data = req.data;
  const { email, phoneNumber, password, firstName } = req.data;

  const existingUser = await db.users.findOne({
    where: {
      [Op.or]: [{ email }, { phoneNumber }],
    },
  });

  if (existingUser) {
    throw new AppError(
      "A user with this email or phone number already exists",
      409
    );
  }

  let accountNum = createAccountNumber();
  while (await db.accounts.findOne({ where: { accountNumber: accountNum } })) {
    accountNum = createAccountNumber();
  }

  const hashedPassword = await hashPassword(password);

  await db.sequelize.transaction(async (t) => {
    const user = await db.users.create(
      { ...data, password: hashedPassword },
      { transaction: t }
    );

    await db.accounts.create(
      {
        userId: user.id,
        balance: 0,
        accountNumber: accountNum,
        currency: "usd",
      },
      { transaction: t }
    );

    //  send otp to mail
    await sendMail({ to: email, subject: `Welcome ${firstName}.` }, "welcome", {
      name: firstName,
      login_link: `${ClIENT_URL}/auth/sign-in`,
    });

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
      accessToken,
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

    // const verificationUrl = `${ClIENT_URL}auth/verify-email?token=${otp.code}&email=${email}`;
    await sendMail(
      {
        to: user.email,
        subject: "Email verification.",
      },
      "otp",
      {
        title:
          "Verify your identity: temporary code for recovery (expires in 10 minutes)",
        code: otp.code,
      }
    );
    const devResult =
      process.env.NODE_ENV === "development" ? { code: otp.code } : {};

    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      ...devResult,
    });
  });
});

exports.confirmEmailVerification = async (req, res, next, t) => {
  const user = req.user;
  try {
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
  } catch (error) {
    next(error);
  }
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
    const { code } = await createOTP(user.id, "password.recovery", t);

    await sendMail(
      {
        to: user.email,
        subject: "Reset password.",
      },
      "otp",
      {
        title:
          "Verify your identity: temporary code for recovery (expires in 10 minutes)",
        code,
      }
    );

    res.status(200).json({
      status: "success",
      message: "A code was sent to your email!",
      code: process.env.NODE_ENV === "development" ? code : undefined,
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
  try {
    await user.update({ password: hashNewPassword }, { transaction: t });
    await sendMail(
      {
        to: user.email,
        subject: "Reset password.",
      },
      "normal",
      {
        name: user.name,
        title: "Password has been reset.",
        nessage:
          "We wanted to let you know that your password has been successfully reset.You can now log in using your new password. If you experience any issues, feel free to reach out for assistance.",
      }
    );

    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};
