const HomeController = require("../controllers/HomeController");
const router = require(`express`).Router();



router.get(`/`, HomeController.home);

router.use(`/register`, require(`./registerRoutes`));

router.use(`/login`, require(`./loginRoutes`));

router.use(`/logout`, require(`./logoutRoutes`));

router.use(`/cars`, require(`./carRoutes`));

module.exports = router;
