const dbConfig = require("../config/db.config.js");

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

const _db = {
  dbConfig,
  Sequelize,
  sequelize,
  customers: null
};

_db.dbConfig = dbConfig,
_db.Sequelize = Sequelize;
_db.sequelize = sequelize;
_db.customers = require("./customer.model")(sequelize, Sequelize);

module.exports = _db;