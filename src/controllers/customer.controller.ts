// framework and middleware
import database from '../models';
import formalChecker, { checkFiscalCode } from '../middleware/formalChecker.middleware';
const paginationMiddleware = require("../middleware/pagination.middleware");
// import db models
const Customer = database.customers;

const Op = database.Sequelize.Op;

// Create and save a new Customer
// Needed permission level: 3 [HelpDesk]
exports.create = (req, res) => {
    if (req.session.permissionLevel < 3) {
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

    if(req.body.fiscalCode){
        if(!formalChecker.checkVatNumber(req.body.fiscalCode)){
            res.status(400).send({
                message: "Invalid fiscal code provided."
            });
            return;
        }
    }

    /*if(req.body.vatNumber){
        if(!formalChecker.checkVatNumber(req.body.vatNumber)){
            res.status(400).send({
                message: "Invalid VAT number provided."
            });
            return;
        }
    }*/

    if(req.body.privateEMail){
        if(!formalChecker.checkMailAddress(req.body.privateEMail)){
            res.status(400).send({
                message: "Invalid Private EMail address provided."
            });
            return;
        }
    }

    if(req.body.companyEMail){
        if(!formalChecker.checkMailAddress(req.body.companyEMail)){
            res.status(400).send({
                message: "Invalid Company EMail address provided."
            });
            return;
        }
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
        footNote: req.body.footNote ? req.body.footNote : null,
        homePhoneNumber: req.body.homePhoneNumber ? req.body.homePhoneNumber : null,
        officePhoneNumber: req.body.officePhoneNumber ? req.body.officePhoneNumber : null,
        privateMobilePhoneNumber: req.body.privateMobilePhoneNumber ? req.body.privateMobilePhoneNumber : null,
        companyMobilePhoneNumber: req.body.companyMobilePhoneNumber ? req.body.companyMobilePhoneNumber : null,
        privateEMail: req.body.privateEMail ? req.body.privateEMail : null,
        companyEMail: req.body.companyEMail ? req.body.companyEMail : null,
        lastEditedBy: req.session.userName,
        version: 1
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
// Needed permission level: 3 [HelpDesk]
exports.findAll = (req, res) => {
    if (req.session.permissionLevel < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    const { page, size, query } = req.query;
    var condition = query ? { businessName: { [Op.like]: `%${query}%` } } : null;

    const { limit, offset } = paginationMiddleware.getPagination(page, size);

    Customer.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = paginationMiddleware.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customers."
            });
        });
};

// Find a single Customer with an id
// Needed permission level: 1 [Customer]
exports.findOne = (req, res) => {
    const id = req.params.id;
    // the customer can read his profile data
    if (
        // if the customer tries reading another one
        req.session.permissionType < 3 &&
        id != req.session.idCustomer
    ) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to access this Customer."
        });
        return;
    }
    
    Customer.scope("extended").findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Customer with customerId=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with customerId=" + id
            });
        });
};

// Update a Customer by the id in the request
// Needed permission level: 3 [HelpDesk]
exports.update = (req, res) => {
    if (req.session.permissionLevel < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    if (
        req.body.idCustomer ||
        req.body.createdAt ||
        req.body.updatedAt ||
        req.body.lastEditedBy
    ) {
        res.status(400).send({
            message: "Illegal values present in request body."
        });
        return;
    }

    if (
        !req.body.version
    ) {
        res.status(400).send({
            message: "Invalid record version."
        });
        return;
    }

    const id = req.params.id;

    // check if customer exists in DB
    Customer.scope("verCheck").findByPk(id)
        .then(data => {
            if (data) {
                // check if client-sent record version is the same as the server
                console.log(req.body.version, data.version);
                if (req.body.version == data.version) {
                    // increment record version
                    let buf = req.body;
                    buf.version = buf.version + 1;
                    // set latest edit username
                    buf.lastEditedBy = req.session.userName;
                    Customer.update(buf, {
                        where: { idCustomer: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Customer was updated successfully."
                                });
                            } else {
                                res.status(500).send({
                                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or request body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Customer with id=" + id
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "Your record version is older than the one present on the server."
                    });
                }
            } else {
                res.status(404).send({
                    message: `Cannot find Customer with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
// Needed permission level: 3 [HelpDesk]
exports.delete = (req, res) => {
    if (req.session.permissionLevel < 3) {
        res.status(403).send({
            message: "JWT does not have the necessary permission level to do this."
        });
        return;
    }

    const id = req.params.id

    Customer.destroy({
        where: { idCustomer: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer deleted successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};