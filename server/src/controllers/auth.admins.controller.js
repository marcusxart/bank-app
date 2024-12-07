const asyncHandler = require("express-async-handler");

const AppError = require("../exceptions/errors");
const { checkPassword } = require("../utils/hashPassword");
const { generateToken, generateRefreshToken } = require("../utils/tokenGen");
const constants = require("../config/constants");
const db = require("../database/models");

exports.adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Both email and password are required.", 400);
  }

  const admin = await db.admins.findOne({ where: { email } });

  if (!admin) {
    throw new AppError("Admin not found.", 404);
  }

  if (!(await checkPassword(password, admin.password))) {
    throw new AppError("Invalid email or password.", 401);
  }

  const adminInfo = { id: admin.id, email: admin.email };
  const accessToken = generateToken(adminInfo);
  const refreshToken = generateRefreshToken(adminInfo);

  await db.sequelize.transaction(async (t) => {
    await db.admins.update(
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
    res.cookie(
      constants.COOKIE_OPTIONS.NAME,
      refreshToken,
      constants.COOKIE_OPTIONS.OPTIONS
    );
    res.status(200).send({
      status: "success",
      message: "You've successfully logged in.",
      accessToken,
    });
  });
});
