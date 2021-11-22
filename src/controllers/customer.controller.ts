// framework and middleware
import database from '../models';
// import db models
const Customer = database.customers;

const Op = database.Sequelize.Op;

// Create and save a new Customer
// Needed permission level: 2 [Help Desk Operator]
exports.create = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    // Validate request, checking for empty parameters
    if (
        !req.body.businessName ||
        !req.body.registeredOfficeAddress ||
        !req.body.registeredOfficeCity
    ) {
        res.status(400).send({
            message: "Required values are missing."
        });
        return;
    }

    // Create a Customer object
    const customer = {
        businessName: req.body.businessName,
        registeredOfficeAddress: req.body.registeredOfficeAddress,
        registeredOfficeCity: req.body.registeredOfficeCity,
        headquartersAddress: req.body.headquartersAddress ? req.body.headquartersAddress : null,
        headquartersCity: req.body.headquartersCity ? req.body.headquartersCity : null,
        fiscalCode: req.body.fiscalCode ? req.body.fiscalCode : null,
        vatNumber: req.body.vatNumber ? req.body.vatNumber : null,
        footNote: req.body.footNote ? req.body.footNote : null
    };

    // Save the customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Generic error while creating Customer."
            });
        });
};

// Retrieve all Customers from the database.
// Needed permission level: 2 [Help Desk Operator]
exports.findAll = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }
    //TODO: Implement Customer.findAll() WITH PAGINATION
};

// Find a single Customer with an id
// Needed permission level: 1 [Customer]
exports.findOne = (req, res) => {
    // the customer can read his profile data
    //TODO: Implement Customer.findOne() security check
    //TODO: Implement Customer.findOne()
};

// Update a Customer by the id in the request
// Needed permission level: 2 [Help Desk Operator]
exports.update = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }
    //TODO: Implement Customer.update()
};

// Delete a Customer with the specified id in the request
// Needed permission level: 2 [Help Desk Operator]
exports.delete = (req, res) => {
    if (req.session.permissionLevel < 2) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }
    //TODO: Implement Customer.delete()
};