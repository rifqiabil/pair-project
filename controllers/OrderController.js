const { Order, User, Car } = require(`../models/index`);
const { Op } = require(`sequelize`);
const { toRupiah } = require(`../helpers/formatter`);
const { createInvoice } = require("ez-invoice");
const { createWriteStream } = require("fs");

class OrderController {
  static async list(req, res) {
    try {
      const role = req.session.userRole;
      const UserId = req.session.userId;
      const {invoice} = req.query

      let data;

      if (role === "admin") {
        data = await Order.findAll({
          include: {
            model: User,
            include: Car,
          },
        });
      } else if (role === "user") {
        data = await Order.findAll({
          include: {
            model: User,
            include: Car,
          },
          where: {
            UserId,
          },
        });
      }

      // res.json(data)
      res.render(`orderList`, { data, toRupiah, role, invoice });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async paid(req, res) {
    try {
      const { uniqueKey } = req.params;

      const update = await Order.update(
        { isPaid: true },
        { where: { uniqueKey } }
      );

      res.redirect(`/orders`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async confirmed(req, res) {
    try {
      const { uniqueKey } = req.params;

      const update = await Order.update(
        { isConfirmed: true },
        { where: { uniqueKey } }
      );

      res.redirect(`/orders`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async del(req, res) {
    try {
      const { uniqueKey } = req.params;

      const update = await Order.destroy({ where: { uniqueKey } });

      res.redirect(`/orders`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async invoice(req, res) {
    try {
      const { uniqueKey } = req.params;

      const data = await Order.findOne({
        where: { uniqueKey },
        include: Car,
      });

      const options = {
        storeName: "MOBIL GAYA",
        tax: 11,
        currency: "IDR",
        paymentMode: data.paymentMethod,
        location: data.shippingAddress,
        invoiceID: data.uniqueKey,
      };

      let items = [
        {
          name: data.Car.name,
          beforeTax: data.Car.price,
        },
      ];

      const invoice = createInvoice(options, items);
      invoice.jpeg.pipe(createWriteStream("./public/invoice.jpeg"));

      res.redirect(`/orders?invoice=ada`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = OrderController;
