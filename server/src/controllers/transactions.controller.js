const asyncHandler = require("express-async-handler");

const filterSortPaginate = require("../utils/filterSortPaginate");
const db = require("../database/models");

exports.getUserTransaction = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const results = await filterSortPaginate(
    db.transactions,
    ["paginate"],
    req.query,
    { where: userId }
  );

  res.status(200).send({
    status: "success",
    results,
  });
});
