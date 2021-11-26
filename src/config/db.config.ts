require('dotenv').config();

export = {
    HOST: process.env.HOST ? process.env.HOST : "localhost",
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DB_DIALECT ? process.env.DB_DIALECT : "mysql",
    pool: {
        max: process.env.DB_POOL_MAX ? process.env.DB_POOL_MAX : 5,
        min: process.env.DB_POOL_MIN ? process.env.DB_POOL_MIN : 0,
        acquire: process.env.DB_POOL_ACQUIRE ? process.env.DB_POOL_ACQUIRE : 30000,
        idle: process.env.DB_POOL_IDLE ? process.env.DB_POOL_IDLE : 10000
    },
};