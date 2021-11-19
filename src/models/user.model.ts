module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      legalName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      legalSurname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      permissionType: {
        type: Sequelize.CHAR
      },
      idCustomer: {
        type: Sequelize.INTEGER
      }
    });
  
    return User;
  };