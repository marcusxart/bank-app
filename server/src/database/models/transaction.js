const { DataTypes } = require("sequelize");
const { TRANSACTION, CURRENCY } = require("../../config/constants");

const transaction = (sequelize) => {
  const transaction = sequelize.define(
    "transactions",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [TRANSACTION.STATUS],
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [TRANSACTION.TYPES],
        },
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [CURRENCY],
        },
      },
      referenceId: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["userId"],
        },
      },
    }
  );

  transaction.associate = (models) => {
    transaction.belongsTo(models.users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return transaction;
};

module.exports = transaction;
