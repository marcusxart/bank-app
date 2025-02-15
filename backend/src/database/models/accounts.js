const { DataTypes } = require("sequelize");

const accounts = (sequelize) => {
  const Accounts = sequelize.define("accounts", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["personal", "current", "checking"]],
      },
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["usd", "eur", "gbp"]],
      },
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  });

  Accounts.associate = (models) => {
    Accounts.belongsTo(models.users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return Accounts;
};
module.exports = accounts;
