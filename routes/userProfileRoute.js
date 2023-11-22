const UserProfileController = require("../controllers/UserProfileController");
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

router.get(`/`, bothRole, UserProfileController.display);
router.post(`/`, bothRole, UserProfileController.displayPost);

module.exports = router;
