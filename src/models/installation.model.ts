module.exports = (sequelize, Sequelize) => {
    const Installation = sequelize.define("installation", {
        idInstallation: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idCustomer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        installationAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        installationCity: {
            type: Sequelize.STRING,
            allowNull: false
        },
        heater: {
            type: Sequelize.STRING
        },
        installationType: {
            type: Sequelize.STRING
        },
        manteinanceContractName: {
            type: Sequelize.STRING
        },
        toCall: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        monthlyCallInterval: {
            type: Sequelize.INTEGER
        },
        contractExpiryDate: {
            type: Sequelize.DATE
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
    });

    return Installation;
};