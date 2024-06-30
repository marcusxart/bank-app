require("dotenv").config();
const asyncHandler = require("express-async-handler");
const AppError = require("../exceptions/errors");
const upload = require("../utils/upload");

exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }
  const result = await upload(req.file.path);

  res.status(200).json({
    status: "success",
    message: "Image uploaded successfully",
    url: result.url,
  });
});
