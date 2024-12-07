const { Router } = require("express");

const admins = Router();

admins.get("/", (req, res) => {
  res.send("Admin route");
});

admins.use("/auth", require("./auth.admin"));

admins.use("/admins-mgt", require("./adminMgt.admin"));
admins.use("/users-mgt", require("./users.admin"));

module.exports = admins;
