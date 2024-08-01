const { Router } = require("express");
const {
  requestForLoan,
  loansHistory,
  getLoanTypes,
  getLoanSchedule,
} = require("../controllers/loans.controller");
const validators = require("../middlewares/validators.middleware");

const loans = Router({ mergeParams: true });

loans.get("/", loansHistory);
loans.get("/types", getLoanTypes);
loans.get("/schedule", getLoanSchedule);
loans.post("/request", validators.loanRequest, requestForLoan);

module.exports = loans;
