const {Car, Order} = require(`../models/index`)
const {Op} = require(`sequelize`)
const {numberWithCommas, toRupiah} = require(`../helpers/formatter`)

class CarController {
    static async list(req, res) {
      try {
        const role = req.session.userRole
        let data = await Car.findAll({
          order: [["productionYear", "ASC"], ["stock", "DESC"]],
        })
        res.render(`carList`, {data, numberWithCommas, toRupiah, role})
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