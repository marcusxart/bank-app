const { Router } = require("express");
const { createUser, signIn } = require("../controllers/auth.controller");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createUserSchema, signInSchema } = require("../schemas");

const auth = Router();

auth.post("/create-user", validateRequest(createUserSchema), createUser);
auth.post("/sign-in", validateRequest(signInSchema), signIn);

module.exports = auth;
