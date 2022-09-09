const router = require('express').Router();
const { Accounts } = require('../../models');

router.post('/create', async (req, res) => {
	try {
		console.log('Generating User...');
		const accountInfo = await Accounts.create(req.body);

		req.session.save(() => {
			req.session.userName = accountInfo.userName;
			req.session.loggedIn = true;
		});
		res.status(200).json(accountInfo);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
});

router.post('/login', async (req, res) => {
	try {
		const accountInfo = await Accounts.findOne({
			where: { userName: req.body.userName },
		});

		if (!accountInfo) {
			res.status(400).json({ message: 'No account with that information' });
			return;
		}

		const checkPass = await accountInfo.validatePassword(req.body.password);

		if (!checkPass) {
			res.status(400).json({ message: 'Incorrect login credentials' });
			return;
		}

		req.session.save(() => {
			req.session.userName = accountInfo.userName;
			req.session.loggedIn = true;

			res.json({ account: accountInfo, messsage: 'Succesfully logged in' });
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
