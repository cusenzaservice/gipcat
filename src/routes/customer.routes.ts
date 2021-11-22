module.exports = app => {
  const customers = require("../controllers/customer.controller");
  const userMiddleware = require("../middleware/user.middleware");

  var router = require("express").Router();
  router.post("/", userMiddleware.verify, customers.create);
  router.get("/", userMiddleware.verify, customers.findAll);
  router.get("/:id", userMiddleware.verify, customers.findOne);
  router.put("/:id", userMiddleware.verify, customers.update);
  router.delete("/:id", userMiddleware.verify, customers.delete);
  app.use('/api/customers', router);
};