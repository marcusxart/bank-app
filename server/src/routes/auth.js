const { Router } = require("express");
const {
  createUser,
  handleLogin,
  forgetPassword,
  resetPassword,
  sendEmailVerification,
  confirmEmailVerification,
} = require("../controllers/auth.controller");
const {
  handleRefreshToken,
  handleLogout,
} = require("../controllers/refreshToken.controller");
const { verifyOtp } = require("../controllers/otp.controller");
const {
  createAccountValidationMiddleware,
} = require("../middlewares/AccountValidations.middleware");
const validators = require("../middlewares/validators.middleware");

const auth = Router();

auth.post("/sign-up", createAccountValidationMiddleware, createUser);
auth.post("/sign-in", validators.emailPassword, handleLogin);
auth.post("/sign-out", handleLogout("users"));
auth.post("/refresh", handleRefreshToken("users"));

//  forgotten password  roists
auth.post("/forgotten-password", validators.email, forgetPassword);
auth.post("/forgotten-password/verify-otp", verifyOtp("password.recovery"));
auth.post(
  "/forgotten-password/reset",
  validators.reset,
  verifyOtp("password.recovery", resetPassword)
);

// email verification routes
auth.post("/verify-email", validators.email, sendEmailVerification);
auth.post(
  "/verify-email/confirmation",
  verifyOtp("email.verification", confirmEmailVerification)
);

module.exports = auth;
