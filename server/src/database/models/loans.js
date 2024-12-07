const { DataTypes } = require("sequelize");
const { LOAN, CURRENCY } = require("../../config/constants");

const loan = (sequelize) => {
  const loan = sequelize.define("loans", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [LOAN.STATUS],
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [LOAN.TYPES],
      },
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repaymentSchedule: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [LOAN.SCHEDULE],
      },
    },
  });

  loan.associate = (models) => {
    loan.belongsTo(models.users, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "CASCADE",
    });
  };

  return loan;
};

module.exports = loan;
