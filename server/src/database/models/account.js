const { DataTypes } = require("sequelize");
const constants = require("../../config/constants");

const account = (sequelize) => {
  const account = sequelize.define(
    "accounts",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: DataTypes.ENUM(...constants.CURRENCY),
        allowNull: false, // Default currency
      },
    },
    { timestamps: false }
  );

  account.associate = (models) => {
    account.belongsTo(models.users, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "CASCADE",
    });
  };

  return account;
};

module.exports = account;
