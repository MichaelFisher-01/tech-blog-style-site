const router = require('express').Router();
const { Accounts } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const accountInfo = await Accounts.create(req.body);
		console.log(accountInfo);
		req.session.save(() => {
			req.session.userName = accountInfo.userName;
			req.session.loggedIn = true;
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
