const { Router } = require("express");
const validators = require("../middlewares/validators.middleware");
const {
  getAllUsers,
  unBlockUsers,
  blockUsers,
  sendMailToUser,
  addFunds,
  deleteUser,
} = require("../controllers/users.admins.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const { getUser } = require("../controllers/users.controller");

const users = Router();

users.use(adminMiddleware(["super-admin", "sub-admin", "users-mgt"]));

users.get("/", getAllUsers);
users.get("/:id", getUser);
users.delete("/:id", deleteUser);
users.post("/:id/unblock", unBlockUsers);
users.post("/:id/block", blockUsers);
users.post("/:id/add-funds", validators.addFunds, addFunds);
users.post("/:id/send-mail", sendMailToUser);

module.exports = users;
