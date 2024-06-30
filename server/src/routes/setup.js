const { Router } = require("express");
const { setupAdminControl } = require("../controllers/setup.controller");
const validators = require("../middlewares/validators.middleware");

const setup = Router();

setup.post("/", validators.emailPassword, setupAdminControl);

module.exports = setup;
