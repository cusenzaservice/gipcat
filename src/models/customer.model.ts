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
        homePhoneNumber: {
            type: Sequelize.STRING(50)
        },
        officePhoneNumber: {
            type: Sequelize.STRING(50)
        },
        privateMobilePhoneNumber: {
            type: Sequelize.STRING(50)
        },
        companyMobilePhoneNumber: {
            type: Sequelize.STRING(50)
        },
        privateEMail: {
            type: Sequelize.STRING(150)
        },
        companyEMail: {
            type: Sequelize.STRING(150)
        },
        fiscalCode: {
            type: Sequelize.STRING(16)
        },
        vatNumber: {
            type: Sequelize.STRING(13)
        },
        footNote: {
            type: Sequelize.TEXT
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
                        'headquartersAddress',
                        'headquartersCity',
                        'fiscalCode',
                        'vatNumber',
                        'footNote',
                        'lastEditedBy',
                        'version',
                        'homePhoneNumber',
                        'officePhoneNumber',
                        'privateMobilePhoneNumber',
                        'companyMobilePhoneNumber',
                        'privateEMail',
                        'companyEMail'
                    ]
                }
            },
            scopes: {
                extended: {
                    attributes: {}
                },
                verCheck: {
                    attributes: {
                        exclude: [
                            'headquartersAddress',
                            'headquartersCity',
                            'fiscalCode',
                            'vatNumber',
                            'footNote',
                            'lastEditedBy',
                            'registeredOfficeAddress',
                            'registeredOfficeCity',
                            'businessName',
                            'homePhoneNumber',
                            'officePhoneNumber',
                            'privateMobilePhoneNumber',
                            'companyMobilePhoneNumber',
                            'privateEMail',
                            'companyEMail'
                        ]
                    }
                }
            }
        });

    return Customer;
};