"use strict";
module.exports = (sequelize, DataTypes) => {
  const Id_cards = sequelize.define(
    "Id_cards",
    {
      birth: DataTypes.DATE,
      person_id: DataTypes.INTEGER
    },
    {}
  );
  Id_cards.associate = function(models) {
    // associations can be defined here
    Id_cards.belongsTo(models.Persons, {
      foreignKey: "person_id"
    });
  };
  return Id_cards;
};
