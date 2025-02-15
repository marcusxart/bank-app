const { DataTypes } = require("sequelize");

const users = (sequelize) => {
  const Users = sequelize.define("users", {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female", "others"]],
      },
    },
    userCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dialCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.accounts, {
      foreignKey: "userId",
      as: "accounts",
    });
    Users.hasOne(models.contacts, {
      foreignKey: "userId",
      as: "contact",
    });
  };

  return Users;
};

module.exports = users;
