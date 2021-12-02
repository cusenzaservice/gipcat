module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        legalName: {
            type: Sequelize.STRING
        },
        legalSurname: {
            type: Sequelize.STRING
        },
        passwordHash: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        /* 
        ID | READABLE NAME
        1  | Customer
        2  | Technichan
        3  | HelpDesk
        */
        permissionType: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // only needed if 'permissionType' = 1
        idCustomer: {
            type: Sequelize.INTEGER
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
                attributes: { exclude: ['passwordHash'] }
            },
            scopes: {
                loginScope: {
                    attributes: { }
                }
            }
        });

    return User;
};