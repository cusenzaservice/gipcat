require('dotenv').config();

module.exports = {
    origin: process.env.ORIGIN,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS ? process.env.BCRYPT_SALT_ROUNDS : 10
};