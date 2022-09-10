const withAuth = (req, res, next) => {
	if (!req.session.loginStatus) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = withAuth;
