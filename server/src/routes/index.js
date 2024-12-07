const { Router } = require("express");
const verifyJWT = require("../middlewares/verifyJWT.middleware");
// const { testing } = require("../controllers/testing.controller");
const { uploadImage } = require("../controllers/imageUpload.controller");
const upload = require("../middlewares/upload.middleware");

const api = Router();

api.get("/", (req, res) => {
  res.send("Server running");
});

// api.get("/testing", testing);
api.use("/setup", require("./setup"));

//admin
api.use("/auth", require("./auth"));
api.use("/admin", require("./admins"));

// users

// authorization needed
api.use(verifyJWT);
api.use("/users", require("./users"));
api.post("/upload", upload.single("image"), uploadImage);

module.exports = api;
