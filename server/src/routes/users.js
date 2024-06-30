const { Router } = require("express");
const {
  getUser,
  userTransactions,
  userOverview,
  getMe,
} = require("../controllers/users.controller");
const userSettings = require("./userSettings");

const users = Router();

users.get("/me", getMe);
users.get("/:id", getUser);
users.get("/:id/overview", userOverview);
users.get("/:id/transactions", userTransactions);

//settings
users.use("/:id/settings", userSettings);

module.exports = users;
