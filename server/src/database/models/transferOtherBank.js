const { DataTypes } = require("sequelize");
const { CURRENCY } = require("../../config/constants");

const transferFundOutside = (sequelize) => {
  const transferFundOutside = sequelize.define("transferOtherBanks", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    swiftCode: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    routingNumber: {
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

  transferFundOutside.associate = (models) => {
    transferFundOutside.belongsTo(models.accounts, {
      foreignKey: {
        name: "accountId",
        allowNull: true,
      },
      as: "account",
      onDelete: "SET NULL",
    });
  };

  return transferFundOutside;
};

module.exports = transferFundOutside;
