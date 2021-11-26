module.exports = app => {
    const users = require("../controllers/user.controller");
    const userMiddleware = require("../middleware/user.middleware");

    var router = require("express").Router();
    router.post("/", userMiddleware.verify, users.create);
    router.get("/", userMiddleware.verify, users.findAll);
    router.get("/:userName", userMiddleware.verify, users.findOne);
    router.put("/:userName", userMiddleware.verify, users.update);
    router.delete("/:userName", userMiddleware.verify, users.delete);
    app.use('/users', userMiddleware.verify, router);
};