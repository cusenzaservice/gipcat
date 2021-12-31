module.exports = (sequelize, Sequelize) => {
    const Intervention = sequelize.define("interventions", {
        idIntervention: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idInstallation: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        /**
         * Manutenzione
         * Manutenzione + Analisi Fumi
         * Intervento Generico
         * Prima accensione
         */
        interventionType: {
            type: Sequelize.STRING,
            allowNull: false
        },

        /**
         * 0 Programmato
         * 1 Eseguito
         * 2 Annullato
         */
        interventionState: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        // technichan username which the intervention is assigned to
        assignedTo: {
            type: Sequelize.STRING
        },

        // if this is selected, it will be counted in the call cycle
        countInCallCycle: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        interventionDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        shipmentDate: {
            type: Sequelize.DATE
        },
        protocolNumber: {
            type: Sequelize.INTEGER
        },
        billingDate: {
            type: Sequelize.DATE
        },
        billingNumber: {
            type: Sequelize.INTEGER
        },
        paymentDate: {
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

    return Intervention;
};