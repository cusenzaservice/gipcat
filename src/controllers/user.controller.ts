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
// Needed permission level: 3 [HelpDesk]
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
// Needed permission level: 3 [helpDesk]
exports.findAll = (req, res) => {
    if (req.session.permissionType < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    //TODO: Implement User.findAll()
};

// Find a single User with a userName
// Needed permission level: 1 [Customer]
exports.findOne = (req, res) => {
    console.log(req.params.userName != req.session.userName)

    if (
        req.session.permissionType < 2 &&
        req.params.userName != req.session.userName
    ) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to access this user."
        });
        return;
    }

    const userName = req.params.userName;

    User.findByPk(userName)
        .then(data => {
            if (data) {
                // pop reserved values from array
                delete data.passwordHash;
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with userName=${userName}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + userName
            });
        });
};

// Update a User by the userName in the request
// Needed permission level: 3 [HelpDesk]
exports.update = (req, res) => {
    if (req.session.permissionType < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    if (
        req.body.userName ||
        req.body.createdAt ||
        req.body.updatedAt
    ) {
        res.status(400).send({
            message: "Illegal values present in request body."
        });
        return;
    }

    const userName = req.params.userName;

    User.update(req.body, {
        where: { userName: userName }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update User with userName=${userName}. Maybe User was not found or request body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with userName=" + userName
            });
        });
};

// Delete a User with the specified userName in the request
// Needed permission level: 3 [HelpDesk]
exports.delete = (req, res) => {
    if (req.session.permissionType < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    const userName = req.params.userName;

    User.destroy({
        where: { userName: userName }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete User with userName=${userName}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with userName=" + userName
            });
        });
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