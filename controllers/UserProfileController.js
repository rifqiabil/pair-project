const { UserProfile, User, sequelize } = require(`../models/index`);
const { Op } = require(`sequelize`);

class UserProfileController {
  static async display(req, res) {
    try {
      const id = req.session.userId;
      const { error } = req.query;

      const data = await UserProfile.findOne({
        where: {
          UserId: {
            [Op.eq]: id,
          },
        },
      });

      if (!data) {
        const userData = await User.findByPk(id, {
          attributes: ["email", "id"],
        });
        res.render(`userProfileCreate`, { userData, error });
      } else {
        res.render(`userProfileUpdate`, { data, error });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async displayPost(req, res) {
    try {
      const { firstName, lastName, birthDate, phone, email, address, UserId } = req.body;
      await UserProfile.updateOrCreate(firstName, lastName, birthDate, phone, email, address, UserId);

      const data = await UserProfile.findOne({
        where: {
          UserId,
        },
      });

      res.render(`home`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let err = error.errors.map((el) => el.message);
        res.redirect(`/profiles?error=${err}`);
      } else {
        res.send(error);
      }
    }
  }

  static async template(req, res) { //
    try {
      res.send(`Hello World`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = UserProfileController;