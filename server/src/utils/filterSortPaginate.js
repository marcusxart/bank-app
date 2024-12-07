const { Op } = require("sequelize");
const { MAX_RESULTS } = require("../config/constants");

const filterSortPaginate = async (
  model,
  options = [],
  reqQuery = {},
  where = {},
  attributes = {},
  include = {}
) => {
  const {
    page = 1,
    limit = MAX_RESULTS,
    search = "",
    sort = "createdAt",
    order = "DESC",
  } = reqQuery;
  const sequelizeOptions = {
    order: [[sort, order.toUpperCase()]], // Default sorting
  };

  // Validate pagination parameters
  const size = Math.max(parseInt(limit, 10), 1); // Ensure limit is at least 1
  const currentPage = Math.max(parseInt(page, 10), 1); // Ensure page is at least 1
  const offset = (currentPage - 1) * size;

  // Apply pagination
  if (options.includes("paginate")) {
    sequelizeOptions.limit = size;
    sequelizeOptions.offset = offset;
  }

  // Apply filtering
  const filterOption = options.find(
    (option) => typeof option === "object" && option.filter
  );

  if (filterOption && filterOption.filter.length > 0) {
    sequelizeOptions.where = {
      ...where,
      [Op.and]: [
        where,
        {
          [Op.or]: filterOption.filter.map((key) => ({
            [key]: { [Op.like]: `%${search}%` },
          })),
        },
      ],
    };
  } else {
    sequelizeOptions.where = where;
  }

  // Apply attributes if provided
  if (Object.keys(attributes).length > 0) {
    sequelizeOptions.attributes = attributes;
  }

  // Apply includes if provided
  if (Object.keys(include).length > 0) {
    sequelizeOptions.includes = include;
  }

  // Apply sorting if provided in the query
  if (options.includes("sort")) {
    sequelizeOptions.order = [[sort, order.toUpperCase()]];
  }

  try {
    const result = await model.findAndCountAll(sequelizeOptions);

    return {
      totalItems: result.count,
      count: result.rows.length,
      currentPage,
      data: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = filterSortPaginate;
