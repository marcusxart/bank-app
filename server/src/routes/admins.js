const { Router } = require("express");

const verifyJWT = require("../middlewares/verifyJWT.middleware");

const admins = Router();

admins.get("/", (req, res) => {
  res.send("Admin route");
});

admins.use("/auth", require("./auth.admin"));

admins.use(verifyJWT);
admins.use("/admins-mgt", require("./adminMgt.admin"));
admins.use("/users-mgt", require("./users.admin"));

module.exports = admins;
