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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is required`
        },
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    productionYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Production Year is required`
        },
        notEmpty: {
          msg: `Production Year is required`
        },
        validYear (value) {
          let currentYear = new Date().toISOString().slice(0,4) //getFullYear
          if (value > currentYear) {
            throw new Error(`Max Year is this year`)
          } else if (value < (currentYear-15)){
            throw new Error(`Min Year is 15 years ago`)
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Stock is required`
        },
        notEmpty: {
          msg: `Stock is required`
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Color is required`
        },
        notEmpty: {
          msg: `Color is required`
        },
        validColor (value) {
          if (value.length > 10) { //
            throw new Error(`Color maximum 10 characters`)
          }
        }
      }
    },
    fuelType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { 
          msg: `Fuel Type is required`
        }, //validasi isIn
        notEmpty: {
          msg: `Fuel Type is required`
        }
      }
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Transmission is required`
        }, // validasi isIn
        notEmpty: {
          msg: `Transmission is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is required`
        },
        notEmpty: {
          msg: `Price is required`
        },
        validPrice (value) {
          if (value < 100000000) {
            throw new Error(`Price minimum 100.000.000`) // validasi built-in
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is required`
        },
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    carImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Car Image is required`
        },
        notEmpty: {
          msg: `Car Image is required`
        },
        isUrl: {
          msg: `Car Image must be URL format`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};