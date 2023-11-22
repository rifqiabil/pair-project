const UserController = require("../controllers/UserController");
const router = require(`express`).Router();

router.get(`/`, UserController.login);

router.post(`/`, UserController.loginPost);

module.exports = router;
