const asyncHandler = require("express-async-handler");
const { checkPassword, hashPassword } = require("../utils/hashPassword");
const db = require("../database/models");
const upload = require("../utils/upload");

exports.changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { password, newPassword } = req.data;

  const user = await db.users.findOne({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  if (!(await checkPassword(password, user.password))) {
    throw new AppError("Current password is incorrect.", 400);
  }

  const hashNewPassword = await hashPassword(newPassword);

  await db.sequelize.transaction(async (t) => {
    await db.users.update(
      { password: hashNewPassword },
      {
        where: {
          id,
        },
        transaction: t,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Password has been changed.",
    });
  });
});

exports.removeAvatar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findOne({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!user.avatar) {
    throw new AppError("There is no profile image to remove.", 400);
  }
  await db.sequelize.transaction(async (t) => {
    await db.users.update(
      { avatar: null },
      {
        where: {
          id,
        },
        transaction: t,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Profile image was removed.",
    });
  });
});

exports.updateAvatar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (!req.file) {
    throw new AppError("No images uploaded", 400);
  }

  const user = await db.users.findOne({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  db.sequelize.transaction(async (t) => {
    const result = await upload(req.file.path);
    await db.users.update(
      { avatar: result.url },
      {
        where: {
          id,
        },
        transaction: t,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Profile image was removed.",
    });
  });
});
