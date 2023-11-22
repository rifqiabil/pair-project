const UserController = require("../controllers/UserController");
const router = require(`express`).Router();

router.get(`/`, UserController.logout);

module.exports = router;
