const router = require(`express`).Router();
const OrderController = require(`../controllers/OrderController`)

const bothRole = function (req, res, next) {
  console.log(req.session);
  if (!req.session.userRole) {
    const err = `You need to be logged in to access this feature`;
    res.redirect(`/login?error=${err}`);
  } else {
    next();
  }
};

const justAdmin = function (req, res, next) {
  console.log(req.session);
  if (req.session.userRole !== `admin`) {
    const err = `Only Admin could access this feature`;
    res.redirect(`/login?error=${err}`);
  } else {
    next();
  }
};

router.get(`/`, bothRole, OrderController.list);

router.get(`/invoice/:uniqueKey`, bothRole, OrderController.invoice);

router.get(`/paid/:uniqueKey`, bothRole, OrderController.paid);

router.get(`/confirmed/:uniqueKey`, justAdmin, OrderController.confirmed);

router.get(`/delete/:uniqueKey`, justAdmin, OrderController.del);

module.exports = router;
