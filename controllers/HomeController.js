class HomeController {
  static async home(req, res) {
    try {
      res.render(`home`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = HomeController;