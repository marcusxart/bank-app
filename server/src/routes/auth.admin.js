const { Router } = require("express");
const validators = require("../middlewares/validators.middleware");
const {
  handleRefreshToken,
  handleLogout,
} = require("../controllers/refreshToken.controller");
const { adminLogin } = require("../controllers/auth.admins.controller");

const adminsAuth = Router();

adminsAuth.post("/sign-in", validators.emailPassword, adminLogin);
adminsAuth.post("/sign-out", handleLogout("admins"), adminLogin);
adminsAuth.post("/refresh", handleRefreshToken("admins"));

module.exports = adminsAuth;
