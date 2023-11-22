const router = require(`express`).Router();

router.get(`/`, (req, res) => {
  res.send(`Hello Dunia`);
});

router.use(`/register`, require(`./registerRoutes`));

router.use(`/login`, require(`./loginRoutes`));


module.exports = router;
