module.exports = (sequelize, Sequelize) => {
    const customerContact = sequelize.define("customerContact", {
        idCustomerContact: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idCustomer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idContactInformationType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contactData: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastEditedBy: {
            type: Sequelize.STRING
        },
        version: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    },
        {
            defaultScope: {
                attributes: {
                    exclude: [
                        'lastEditedBy',
                        'version'
                    ]
                }
            },
            scopes: {
                extended: {
                    attributes: {}
                }
            }
        });

    return customerContact;
};