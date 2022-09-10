const Comments = require('./comments');
const Accounts = require('./accounts');
const UserPosts = require('./userPosts');

Accounts.hasMany(UserPosts, {
	foreignKey: 'creator',
});

UserPosts.belongsTo(Accounts, {
	foreignKey: 'creator',
});

UserPosts.hasMany(Comments, {
	foriegnKey: 'post_id',
});

Comments.belongsTo(UserPosts, {
	foriegnKey: 'post_id',
});

module.exports = { Accounts, UserPosts, Comments };
