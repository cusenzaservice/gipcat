import crypto from 'crypto';
import bcrypt from 'bcrypt';
require('dotenv').config();

export = {
    origin: process.env.ORIGIN,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS ? process.env.BCRYPT_SALT_ROUNDS : 10,
    jwtSecret: process.env.JWT_SECRET ? process.env.JWT_SECRET : crypto.randomBytes(25).toString('hex'),
    sessionExpiry: process.env.SESSION_EXPIRY ? process.env.SESSION_EXPIRY : '24h',
    apiBasePath: process.env.API_BASE_PATH ? process.env.API_BASE_PATH : '',
    defaultUser: {
        userName: process.env.DEFAULT_USERNAME ? process.env.DEFAULT_USERNAME : 'admin',
        passwordHash: bcrypt.hashSync(
            process.env.DEFAULT_PASSWORD ? process.env.DEFAULT_PASSWORD : 'Password1!',
            process.env.BCRYPT_SALT_ROUNDS ? process.env.BCRYPT_SALT_ROUNDS : 10,
        ),
        permissionType: 3,
        idCustomer: null,
        legalName: "System",
        legalSurname: "Administrator",
        lastEditedBy: null,
        version: 1
    },
    defaultUserPassword: process.env.DEFAULT_PASSWORD ? process.env.DEFAULT_PASSWORD : 'Password1!'
};