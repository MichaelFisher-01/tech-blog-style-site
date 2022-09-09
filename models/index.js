const Accounts = require('./accounts');
const UserPosts = require('./userPosts');

Accounts.hasMany(UserPosts, {
	foreignKey: 'creator',
});

UserPosts.belongsTo(Accounts, {
	foreignKey: 'creator',
});

module.exports = { Accounts, UserPosts };
