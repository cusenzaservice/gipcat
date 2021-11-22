module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        idCustomer: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        businessName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        registeredOfficeAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        registeredOfficeCity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        headquartersAddress: {
            type: Sequelize.STRING
        },
        headquartersCity: {
            type: Sequelize.STRING
        },
        fiscalCode: {
            type: Sequelize.STRING(16)
        },
        vatNumber: {
            type: Sequelize.STRING(13)
        },
        footNote: {
            type: Sequelize.TEXT
        }
    });

    return Customer;
};