module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        legalName: {
            type: Sequelize.STRING,
        },
        legalSurname: {
            type: Sequelize.STRING,
        },
        passwordHash: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        /* 
        ID | READABLE NAME
        0  | Not authenticated, not valid for DB
        1  | Customer
        2  | Help Desk Operator
        3  | Administrator
        */
        permissionType: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // only needed if 'permissionType' = 1
        idCustomer: {
            type: Sequelize.INTEGER,
        }
    });

    return User;
};