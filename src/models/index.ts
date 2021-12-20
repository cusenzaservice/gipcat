import dbConfig from '../config/db.config'
import config from '../config/general.config'
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const database = {
	Sequelize: Sequelize,
	sequelize: sequelize,
	customers: require("./customer.model")(sequelize, Sequelize),
	installations: require("./installation.model")(sequelize, Sequelize),
	users: require("./user.model")(sequelize, Sequelize)
};

database.users.findAndCountAll()
	.then(data => {
		if (data.count == 0) {
			console.log("No users found, creating default user...");
			database.users.create(config.defaultUser)
				.then(data => {
					console.log(`Created default user '${config.defaultUser.userName}' with password '${config.defaultUserPassword}'`);
				})
				.catch(err => {
					console.error("ERR: Cannot create default user. You will not be able to login!")
				});
		}
	})
	.catch(err => {
		console.error("ERR: Check failed for empty user table, you may not be able to login.");
	});

export = database;