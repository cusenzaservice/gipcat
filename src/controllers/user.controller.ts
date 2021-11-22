import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// framework and middleware
import database from '../models';
import config from '../config/general.config';

// import db models
const Customer = database.customers;
const User = database.users;

const Op = database.Sequelize.Op;

// Create and save a new User
// Needed permission level: 3 [Administrator]
exports.create = (req, res) => {
    if (req.session.permissionType < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    // Validate request, checking for empty parameters
    if (
        !req.body.userName ||
        !req.body.password ||
        !req.body.permissionType
    ) {
        res.status(400).send({
            message: "Required values are missing."
        });
        return;
    }

    // validate password length
    if (
        req.body.password.length < 7 ||
        req.body.password.length > 71
    ) {
        res.status(400).send({
            message: "Invalid password length."
        });
        return;
    }

    // when permission level is set to customer,
    // check if a customer id is provided and it's a valid one

    if (
        req.body.permissionType < 1 ||
        req.body.permissionType > 3
    ) {
        res.status(400).send({
            message: "Invalid user permission type."
        });
        return;
    }

    // permission type 1 is customer
    if (req.body.permissionType == 1) {
        // check if a customer has been bound
        if (!req.body.idCustomer) {
            res.status(400).send({
                message: "A customer permission level has been set, " +
                    "but no customer id has been bound!"
            });
            return;
        }
    }

    // Create a Customer object
    const user = {
        userName: req.body.userName,
        passwordHash: bcrypt.hashSync(
            req.body.password,
            config.bcryptSaltRounds
        ),
        permissionType: req.body.permissionType,
        idCustomer: req.body.idCustomer ? req.body.idCustomer : null,
        legalName: req.body.legalName ? req.body.legalName : "",
        legalSurname: req.body.legalSurname ? req.body.legalSurname : ""
    };

    // Save the customer in the database
    Customer.findByPk(req.body.idCustomer)
        .then(data => {
            // chech if customer id actually exists in the database, or it's not needed
            // this is very ugly, but for the async nature of sequelize
            // i must do it here
            if (data || req.body.permissionType != 1) {
                User.create(user)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Generic error while creating User."
                        });
                    });
            } else {
                res.status(400).send({
                    message: "A customer id has been provided, " +
                        "but it does not exist in the database!"
                });
            }
        });
};

// Retrieve all Users from the database.
// Needed permission level: 2 [Help Desk Operator]
exports.findAll = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    //TODO: Implement User.findAll()
};

// Find a single User with an id
// Needed permission level: 2 [Help Desk Operator]
exports.findOne = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    //TODO: Implement User.findOne()
};

// Update a User by the id in the request
// Needed permission level: 3 [Administrator]
exports.update = (req, res) => {
    if (req.session.permissionLevel < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    //TODO: Implement User.update()
};

// Delete a User with the specified id in the request
// Needed permission level: 3 [Administrator]
exports.delete = (req, res) => {
    if (req.session.permissionLevel < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    //TODO: Implement User.delete()
};

/// AUTHENTICATION ///

// Check the login info and return the JWT
// Needed permission level: 0 [Not authenticated]
exports.login = (req, res) => {
    // Validate request, checking for empty parameters
    if (
        !req.body.userName ||
        !req.body.password
    ) {
        res.status(400).send({
            message: "Required values are missing."
        });
        return;
    }

    // validate password length
    if (
        req.body.password.length < 7 ||
        req.body.password.length > 71
    ) {
        res.status(400).send({
            message: "Invalid password length."
        });
        return;
    }

    // Check if user exists
    User.findByPk(req.body.userName)
        .then(data => {
            if (data) {
                //res.send(data);
                if (bcrypt.compareSync(req.body.password, data.passwordHash)) {

                    let session = {
                        idUser: data.idUser,
                        userName: data.userName,
                        legalName: data.legalName,
                        legalSurname: data.legalSurname,
                        permissionType: data.permissionType,
                        idCustomer: data.idCustomer
                    }

                    let token = jwt.sign(
                        session,
                        config.jwtSecret,
                        { expiresIn: config.sessionExpiry }
                    )

                    res.status(200).send({
                        session: session,
                        jwt: token
                    });
                } else {
                    res.status(403).send({
                        message: "Unknown user."
                    });
                    return;
                }
            } else {
                res.status(403).send({
                    message: "Unknown user."
                });
                return;
            }
        });
};

// Check the JWT status and return user session
exports.check = (req, res) => {
    res.status(200).send(req.session);
}