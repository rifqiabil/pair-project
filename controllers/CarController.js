const { Car, Order, sequelize } = require(`../models/index`);
const { Op } = require(`sequelize`);
const { numberWithCommas, toRupiah } = require(`../helpers/formatter`);

class CarController {
  static async list(req, res) {
    try {
      const role = req.session.userRole;
      let data = await Car.findAll({
        // attributes: {
        //   include: [
        //     [sequelize.fn(`COUNT`), sequelize.col("Orders.id"), "totalOrder"]
        //   ]
        // },
        include: Order,
        group: Car.id,
        order: [
          ["productionYear", "ASC"],
          ["stock", "DESC"],
        ],
      });

      // res.json(data)
      res.render(`carList`, { data, numberWithCommas, toRupiah, role });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async add(req, res) {
    try {
      res.render(`carAdd`);
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
      console.log(error);
      res.send(error);
    }
  }

  static async edit(req, res) {
    try {
      const {id} = req.params

      let data = await Car.findByPk(id)

      res.render(`carEdit`, {data});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async editPost(req, res) {
    try {
      const {id} = req.params
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

      await Car.update({
        name,
        productionYear,
        stock,
        color,
        fuelType,
        transmission,
        price,
        description,
        carImage,
      }, {where: {id}})
      res.redirect(`/cars`);
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
