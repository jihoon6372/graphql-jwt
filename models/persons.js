"use strict";
module.exports = (sequelize, DataTypes) => {
  const Persons = sequelize.define(
    "Persons",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Persons.associate = function(models) {
    // associations can be defined here
    Persons.hasOne(models.Id_cards);
  };
  return Persons;
};
