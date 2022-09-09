const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserPosts extends Model {}

UserPosts.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postBody: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		creator: {
			type: DataTypes.STRING,
			references: {
				model: 'accounts',
				key: 'userName',
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		modelName: 'userPosts',
	}
);

module.exports = UserPosts;
