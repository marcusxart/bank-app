const http = require("http");

const app = require("./src/app");
const db = require("./src/database");
const { PORT } = require("./variables");

const server = http.createServer(app);

db.sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => console.log(`Listening to port ${PORT}`));
});
