const { DataTypes } = require("sequelize");

const contacts = (sequelize) => {
  const Contacts = sequelize.define("contacts", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Contacts.associate = (models) => {
    Contacts.belongsTo(models.users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return Contacts;
};
module.exports = contacts;
