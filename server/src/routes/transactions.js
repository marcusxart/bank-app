const { Router } = require("express");
const {
  getUserTransaction,
} = require("../controllers/transactions.controllers");
const validators = require("../middlewares/validators.middleware");

const transactions = Router();

transactions.post("/:userId/add", getUserTransaction);

module.exports = transactions;
