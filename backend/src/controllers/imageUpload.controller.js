const asyncHandler = require("express-async-handler");
const upload = require("../utils/upload");
const AppError = require("../utils/errors");

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
