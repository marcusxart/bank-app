const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../../variables");

exports.generateToken = function (data) {
  return jwt.sign(data, ACCESS_TOKEN_SECRET);
};
