const { DataTypes } = require("sequelize");
const constants = require("../../config/constants");

const admin = (sequelize) => {
  const admin = sequelize.define("admins", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.ENUM(...constants.ADMIN_ROLES_VALUES),
      allowNull: false,
    },
  });

  return admin;
};

module.exports = admin;