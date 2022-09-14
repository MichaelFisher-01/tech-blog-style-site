//Setup to connect to the database we create.
//Pulling in sequelize files
const Sequelize = require('sequelize');
//Pulling in dotenv files so we can pull the names needed from a .env file.
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: 'localhost',
			dialect: 'mysql',
			port: 3306,
		}
	);
}

module.exports = sequelize;
