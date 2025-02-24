const bcrypt = require("bcrypt");
const { PASSWORD_SALT } = require("../../variables");

// Hashes a password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = Number(PASSWORD_SALT);
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  return passwordHashed;
};

// Checks if a password matches the hashed password using bcrypt
const checkPassword = async (password, passwordHashed) => {
  const isMatch = await bcrypt.compare(password, passwordHashed);
  return isMatch;
};

module.exports = { hashPassword, checkPassword };
