const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Accounts extends Model {
	validatePassword(password) {
		return bcrypt.compareSync(password, this.password);
	}
}

Accounts.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeCreate: async (newAccountInfo) => {
				newAccountInfo.password = await bcrypt.hash(newAccountInfo.password, 5);
				return newAccountInfo;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: 'accounts',
	}
);

module.exports = Accounts;
