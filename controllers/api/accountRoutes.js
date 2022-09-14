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
		//If the creation fails Send back a bad request message. Experimenting with getting a code to pop up instead.
		res.status(400).json({ problem: error.code, message: error.sqlMessage });
	}
});
//Route to check log in credentials
router.post('/login', async (req, res) => {
	try {
		//Stop the process and wait until we search for a matching username in the database.
		const accountInfo = await Accounts.findOne({
			where: { userName: req.body.userName },
		});
		// If we cannot find that user name then send back that there is not account.
		if (!accountInfo) {
			res.status(400).json({ message: 'No account with that information' });
			return;
		}
		//If we do find a matching one encrypt the password the same way it was encrypted upon creation of the account then check if the entered password matches the database.
		const checkPass = await accountInfo.validatePassword(req.body.password);
		//If the password entered does not matchn the send back incorrect log in credentials.
		if (!checkPass) {
			res.status(400).json({ message: 'Incorrect login credentials' });
			return;
		}
		//If no problems with the credentials then save the user information to sessions so we can use it on multiple pages and send back we successfulyl logged in.
		req.session.save(() => {
			req.session.userName = accountInfo.userName;
			req.session.loginStatus = true;

			res.json({ account: accountInfo, messsage: 'Succesfully logged in' });
		});
	} catch (error) {
		//If there are any errors during this send back a failed status to display to the user.
		res.status(500).json(error);
	}
});
//Route for logging out. This will destroy the session we are using currently.
router.post('/logout', (req, res) => {
	if (req.session.loginStatus) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
//Send these routes to the main index so we can try and keep things neat.
module.exports = router;
