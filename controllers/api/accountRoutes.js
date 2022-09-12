const router = require('express').Router();
const { Accounts } = require('../../models');
//A route for creating accounts.
router.post('/create', async (req, res) => {
	try {
		//waits for a new entry in the accounts table to be created before moving forward
		const newAccount = await Accounts.create(req.body);
		//Saves the values from the newAccount we created to our session so the info will be avialable on multiple webpages, then sends a resposne back.
		req.session.save(() => {
			req.session.userName = newAccount.userName;
			req.session.loginStatus = true;

			res.status(200).json({
				account: newAccount,
				message: 'Account Creationg Successful!',
			});
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ problem: error.code, message: error.sqlMessage });
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
			req.session.loginStatus = true;

			res.json({ account: accountInfo, messsage: 'Succesfully logged in' });
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.loginStatus) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
