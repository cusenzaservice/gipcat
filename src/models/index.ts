import dbConfig from '../config/db.config'
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const database = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  customers: require("./customer.model")(sequelize, Sequelize),
  users: require("./user.model")(sequelize, Sequelize)
};

export = database;