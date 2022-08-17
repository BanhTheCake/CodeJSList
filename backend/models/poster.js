'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posters.belongsTo(models.User, { foreignKey: 'userpostid', targetKey: 'userid' })
    }
  }
  Posters.init({
    postid: DataTypes.STRING,
    userpostid: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Posters',
  });
  return Posters;
};