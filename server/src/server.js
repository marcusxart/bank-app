require("dotenv").config();
const http = require("http");

const app = require("./app");
const db = require("./database/models");
const Logger = require("./utils/logger");

const PORT = process.env.PORT;
const server = http.createServer(app);

db.sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

process.on("unhandledRejection", (reason, promise) => {
  Logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});
