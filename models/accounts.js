"use strict";
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define(
    "accounts",
    {
      username: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING
    },
    {}
  );
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};
