module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
    router.post("/login", users.login);
    app.use('/api/auth', router);
  };