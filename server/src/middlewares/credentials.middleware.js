const { AlLOWED_ORIGINS } = require("../config/constants");

const credentials = (res, req, next) => {
  const origin = req.header.origin;
  if (AlLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
