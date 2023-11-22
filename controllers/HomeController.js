class HomeController {
  static async template(req, res) {
    try {
      res.send(`Hello World`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = HomeController;