const { Car, Order, User, UserProfile, sequelize } = require(`../models/index`);
const { Op } = require(`sequelize`);
const { numberWithCommas, toRupiah } = require(`../helpers/formatter`);

class CarController {
  static async list(req, res) {
    try {
      const role = req.session.userRole;
      const { deleted } = req.query;
      const { bought } = req.query;
      const {nameSearch} = req.query
      const {error} = req.query

      let data 

      if(nameSearch){
        data = await Car.findAll({
          where: {
            name: {
              [Op.iLike]: `%${nameSearch}%`
            }
          },
          order: [
            ["productionYear", "ASC"],
            ["stock", "DESC"],
          ],
        });
      } else {
        data = await Car.findAll({          
          order: [
            ["productionYear", "ASC"],
            ["stock", "DESC"],
          ],
        });
      }
     
      // res.json(data)
      res.render(`carList`, {
        data,
        numberWithCommas,
        toRupiah,
        role,
        deleted,
        bought,
        error
      });
    } catch (error) {
      res.send(error)
    }
  }

  static async add(req, res) {
    try {
      let {errors} = req.query
      
      res.render(`carAdd`, {errors});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPost(req, res) {
    try {
      const {
        name,
        productionYear,
        stock,
        color,
        fuelType,
        transmission,
        price,
        description,
        carImage,
      } = req.body;
      await Car.create({
        name,
        productionYear,
        stock,
        color,
        fuelType,
        transmission,
        price,
        description,
        carImage,
      });

      res.redirect(`/cars`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let err = error.errors.map(el => el.message)
        res.redirect(`/cars/add?errors=${err}`);
      } else {
        res.send(error)
      }
    }
  }

  static async edit(req, res) {
    try {
      const { id } = req.params;

      let data = await Car.findByPk(id);

      res.render(`carEdit`, { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async editPost(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        productionYear,
        stock,
        color,
        fuelType,
        transmission,
        price,
        description,
        carImage,
      } = req.body;

      await Car.update(
        {
          name,
          productionYear,
          stock,
          color,
          fuelType,
          transmission,
          price,
          description,
          carImage,
        },
        { where: { id } }
      );
      res.redirect(`/cars`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async del(req, res) {
    try {
      const { id } = req.params;
      const data = await Car.findByPk(id);

      await Car.destroy({
        where: { id },
      });

      res.redirect(`/cars?deleted=${data.title}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async buy(req, res) {
    try {
      const { id } = req.params;
      const UserId = req.session.userId;

      const validUser = await UserProfile.findOne({
        where: {UserId}
      })


      if (!validUser) {
        throw new Error(`User Profile is required to Purchase Car`) 
      }
      
      const carData = await Car.findByPk(id);

      const userData = await User.findByPk(UserId, {
        include: UserProfile,
      });

      // res.json(validUser)
      res.render(`carBuy`, { carData, userData });
    } catch (error) {
      console.log(error);
      res.redirect(`/cars?error=${error.message}`);
    }
  }

  static async buyPost(req, res) {
    try {
      const { totalAmount, shippingAddress, paymentMethod, UserId, CarId } =
        req.body;

      await Order.create({ totalAmount, shippingAddress, paymentMethod, UserId, CarId })

      await Car.decrement("stock", {
        where: { id : CarId },
      });

      res.redirect(`/orders`)
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async template(req, res) {
    try {
      res.send(`Hello World`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = CarController;
