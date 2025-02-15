const { Router } = require("express");
const { uploadImage } = require("../controllers/imageUpload.controller");
const upload = require("../middlewares/upload.middleware");

const api = Router();

api.get("/", (req, res) => {
  res.send("Server running");
});

api.post("/upload", upload.single("image"), uploadImage);

// client
api.use("/auth", require("./auth"));

module.exports = api;
