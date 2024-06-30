const { DataTypes } = require("sequelize");
const constants = require("../../config/constants");

const OTP = (sequelize) => {
  const OTP = sequelize.define(
    "otp",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...constants.OTP_TYPES),
        allowNull: false,
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  OTP.associate = (models) => {
    OTP.belongsTo(models.users, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
    });
  };

  return OTP;
};

module.exports = OTP;
