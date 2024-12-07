require("dotenv").config();
const http = require("http");

const app = require("./src/app");
const db = require("./src/database/models");
const Logger = require("./src/utils/logger");

const PORT = process.env.PORT;
const developement = process.env.NODE_ENV === "development";
const server = http.createServer(app);

db.sequelize.sync({ alter: true }).then(() => {
  if (developement) {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

process.on("unhandledRejection", (reason, promise) => {
  Logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});
