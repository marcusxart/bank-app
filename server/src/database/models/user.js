const { DataTypes } = require("sequelize");
const constants = require("../../config/constants");

const user = (sequelize) => {
  const user = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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
    verifiedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    refreshToken: { type: DataTypes.STRING, allowNull: true },
    gender: {
      type: DataTypes.ENUM(...constants.USER.GENDER),
      allowNull: false,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.otp);
    user.hasMany(models.accounts);
    user.hasMany(models.transactions);
  };
  return user;
};

module.exports = user;
