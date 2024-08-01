const { DataTypes } = require("sequelize");
const { CURRENCY } = require("../../config/constants");

const transferFund = (sequelize) => {
  const transferFund = sequelize.define("transferBanks", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    recieverAccountNumber: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    description: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [CURRENCY],
      },
    },
  });

  transferFund.associate = (models) => {
    transferFund.belongsTo(models.accounts, {
      foreignKey: {
        name: "accountId",
        allowNull: true,
      },
      as: "account",
      onDelete: "SET NULL",
    });
  };

  return transferFund;
};

module.exports = transferFund;
