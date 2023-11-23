'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.Order)
      Car.belongsToMany(models.User, {through: "Order"})
    }

    get afterTax() {
      return Math.round(this.price * 1.11)
    }

    get title() {
      return `${this.productionYear} ${this.name}`
    }
  }
  Car.init({
    name: DataTypes.STRING,
    productionYear: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    color: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    transmission: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    carImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};