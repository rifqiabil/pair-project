'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User)

    }

    get formatedDate() {
      return this.birthDate.toISOString().slice(0,10)
    }

    static async updateOrCreate(firstName, lastName, birthDate, phone, email, address, UserId) {
      const data = await UserProfile.findOne({
        where: {
          UserId: {
            [Op.eq]: UserId
          }
        }
      })
      if (!data) {
        await UserProfile.create({firstName, lastName, birthDate, phone, email, address, UserId})
      } else {
        await UserProfile.update({firstName, lastName, birthDate, phone, email, address, UserId}, {
          where: {
            id: data.id
          }
        })
      }
    }

  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};