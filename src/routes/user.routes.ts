module.exports = app => {
  const users = require("../controllers/user.controller");
  const userMiddleware = require("../middleware/user.middleware");

  var router = require("express").Router();
  router.post("/", userMiddleware.verify, users.create);
  router.get("/", userMiddleware.verify, users.findAll);
  router.get("/:id", userMiddleware.verify, users.findOne);
  router.put("/:id", userMiddleware.verify, users.update);
  router.delete("/:id", userMiddleware.verify, users.delete);
  app.use('/api/users', userMiddleware.verify, router);
};