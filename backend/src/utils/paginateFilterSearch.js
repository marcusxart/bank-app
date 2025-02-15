const { Op } = require("sequelize");

const paginateFilterSearch = async ({
  model,
  options = [],
  where = {},
  attributes = {},
  include = [],
  reqQuery = {},
}) => {
  const { page = 1, limit = 6, search = "", status = "", type } = reqQuery;
  const sequelizeOptions = {
    order: [["createdAt", "DESC"]],
  };

  // Apply pagination if 'paginate' is in options
  if (options.includes("paginate")) {
    const size = parseInt(limit);
    const offset = (parseInt(page) - 1) * size;
    sequelizeOptions.limit = size;
    sequelizeOptions.offset = offset;
  }

  // Include 'status' in the 'where' clause if provided
  if (status && options.includes("status")) {
    where.status = status;
  }

  if (type && options.includes("type")) {
    where.type = type;
  }

  // Apply filtering if 'filter' is in options
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
  if (include.length > 0) {
    sequelizeOptions.include = include;
  }

  try {
    const result = await model.findAndCountAll(sequelizeOptions);

    return {
      totalItems: result.count,
      count: result.rows.length,
      currentPage: parseInt(page),
      data: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = paginateFilterSearch;
