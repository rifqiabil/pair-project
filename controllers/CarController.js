const {Car} = require(`../models/index`)
const {numberWithCommas, toRupiah} = require(`../helpers/formatter`)

class CarController {
    static async list(req, res) {
      try {
        const role = req.session.userRole
        let data = await Car.findAll()
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