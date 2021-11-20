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