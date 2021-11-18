require('dotenv').config();

// loads values from environment, if they are not set, defaults are applied
let dialect = process.env.DB_DIALECT ? process.env.DB_DIALECT : "mysql";
let pool_max = process.env.DB_POOL_MAX ? process.env.DB_POOL_MAX : 5;
let pool_min = process.env.DB_POOL_MIN ? process.env.DB_POOL_MIN : 0;
let pool_acquire = process.env.DB_POOL_ACQUIRE ? process.env.DB_POOL_ACQUIRE : 30000;
let pool_idle = process.env.DB_POOL_IDLE ? process.env.DB_POOL_IDLE : 10000;

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: dialect,
    pool: {
      max: pool_max,
      min: pool_min,
      acquire: pool_acquire,
      idle: pool_idle
    }
};