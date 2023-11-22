const UserController = require("../controllers/UserController");
const router = require(`express`).Router();


router.get(`/`, UserController.register);
router.post(`/`, UserController.registerPost);

module.exports = router;
