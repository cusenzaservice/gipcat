module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
    router.post("/login", users.login);
    router.get("/logout", users.logout);
    app.use('/api/auth', router);
  };