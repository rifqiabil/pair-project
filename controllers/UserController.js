const {User} = require(`../models/index`)
const bcrypt = require(`bcryptjs`)

class UserController {
    static async register(req, res) {
      try {
        res.render(`userRegister`);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }

    static async registerPost(req, res) {
      try {
        const {username, password, email, role} = req.body
        let result = await User.create({username, password, email, role})
        res.redirect(`/login`)
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }

    static async login(req, res) {
      try {
        const {error} = req.query
        res.render(`userLogin`, {error});
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }

    static async loginPost(req, res) {
      try {
        const {username, password} = req.body

        let user = await User.findOne({where: {username}})

        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)
          if (isValidPassword){
            req.session.userRole = user.role
            req.session.userId = user.userId

            res.redirect(`/`)
          } else {
            const err = `Invalid Password`
            res.redirect(`/login?error=${err}`)
          }
        } else {
          const err = `Invalid Username`
          res.redirect(`/login?error=${err}`)
        }

      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }

    static async logout(req, res) {
      try {
        req.session.destroy(function(err) {
          if (err) {
            res.send(err)
          }
          else {
            res.redirect(`/login`)           
          }
        })        
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
  }
  
  module.exports = UserController;