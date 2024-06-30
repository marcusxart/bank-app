const { Router } = require("express");
const {
  changePassword,
  removeAvatar,
  updateAvatar,
} = require("../controllers/userSettings.controller");
const validators = require("../middlewares/validators.middleware");
const upload = require("../middlewares/upload.middleware");

const userSettings = Router({ mergeParams: true });

userSettings.post(
  "/change-password",
  validators.changePassword,
  changePassword
);
userSettings.delete("/avatar", removeAvatar);
userSettings.post("/avatar", upload.single("image"), updateAvatar);

module.exports = userSettings;
