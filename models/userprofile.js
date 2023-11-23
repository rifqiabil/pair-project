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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `First Name is required`
        },
        notEmpty: {
          msg: `First Name is required`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Last Name is required`
        },
        notEmpty: {
          msg: `Last Name is required`
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Birth Date is required`
        },
        notEmpty: {
          msg: `Birth Date is required`
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Phone Number is required`
        },
        notEmpty: {
          msg: `Phone Number is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is required`
        },
        notEmpty: {
          msg: `Email is required`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Address is required`
        },
        notEmpty: {
          msg: `Address is required`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};