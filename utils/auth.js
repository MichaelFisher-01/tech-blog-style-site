//We check is the user is logged in frequently so creating a helper we can easily attach to certain routes.
const withAuth = (req, res, next) => {
	if (!req.session.loginStatus) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = withAuth;
