'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsTo(models.Car)
    }
  }
  Order.init({
    totalAmount: DataTypes.INTEGER,
    shippingAddress: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    isPaid: DataTypes.BOOLEAN,
    isConfirmed: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};