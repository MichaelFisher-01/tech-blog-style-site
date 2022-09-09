const router = require('express').Router();

router.get('/', async (req, res) => {
	try {
		if (req.session.viewCount) {
			req.session.viewCount++;
		} else {
			req.session.viewCount = 1;
		}

		console.log(req.session.viewCount);
		res.render('homepage', {
			viewCount: req.session.viewCount,
			loginStatus: req.session.loggedIn,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;

router.get('/login', async (req, res) => {
	try {
		res.render('loginPage', { loginStatus: req.session.loggedIn });
	} catch (error) {
		res.status(500).json(error);
	}
});
