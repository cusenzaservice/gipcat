import crypto from 'crypto';
require('dotenv').config();

export = {
    origin: process.env.ORIGIN,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS ? process.env.BCRYPT_SALT_ROUNDS : 10,
    jwtSecret: process.env.JWT_SECRET ? process.env.JWT_SECRET : crypto.randomBytes(25).toString('hex'),
    sessionExpiry: process.env.SESSION_EXPIRY ? process.env.SESSION_EXPIRY : '24h',
    apiBasePath: process.env.API_BASE_PATH ?  process.env.API_BASE_PATH : ''
};