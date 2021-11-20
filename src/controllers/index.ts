// framework and middleware
const Op = database.Sequelize.Op;
const userMiddleware = require("../middleware/user.middleware");

// import db models
const Customer = database.customers;
const User = database.users;