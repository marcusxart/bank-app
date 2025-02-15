const {
  DB_USERNAME,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} = require("../../../variables");
module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
};
