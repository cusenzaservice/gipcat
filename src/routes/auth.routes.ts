module.exports = app => {
  const users = require("../controllers/user.controller");
  const userMiddleware = require("../middleware/user.middleware");

  var router = require("express").Router();
  router.post("/login", users.login);
  router.post("/check", userMiddleware.verify, users.check)
  app.use('/api/auth', router);
};