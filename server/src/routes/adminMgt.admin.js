const { Router } = require("express");
const validators = require("../middlewares/validators.middleware");

const {
  createAdmin,
  getRoles,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
  changeAdminRoles,
} = require("../controllers/adminsMgt.admins.controller");
const adminMiddleware = require("../middlewares/admin.middleware");

const adminsMgt = Router();

adminsMgt.use(adminMiddleware(["super-admin"]));

adminsMgt.post("/", validators.admin, createAdmin);
adminsMgt.get("/", getAllAdmins);
adminsMgt.get("/roles", getRoles);
adminsMgt.get("/:id", getAdmin);
adminsMgt.patch("/:id/change-role", validators.role, changeAdminRoles);
adminsMgt.delete("/:id", deleteAdmin);

module.exports = adminsMgt;
