const CarController = require("../controllers/CarController");
const router = require(`express`).Router();

const bothRole = function (req, res, next) {
    console.log(req.session)
    if(!req.session.userRole){
      const err = `You need to be logged in to access this feature`
      res.redirect(`/login?error=${err}`)
    } else {
      next()
    }
  } 

const justAdmin = function (req, res, next) {
    console.log(req.session)
    if(req.session.userRole !== `admin`){
      const err = `Only Admin could access this feature`
      res.redirect(`/login?error=${err}`)
    } else {
      next()
    }
  } 


router.get(`/`, bothRole, CarController.list);

router.get(`/add`, bothRole, CarController.add);
router.post(`/add`, bothRole, CarController.addPost);


module.exports = router;
