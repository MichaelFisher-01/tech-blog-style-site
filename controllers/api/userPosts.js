const router = require('express').Router();
const { UserPosts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
	try {
		console.log('Generating Post...');
		const newPost = await UserPosts.create({
			...req.body,
			creator: req.session.userName,
		});
		console.log('Post Created Succesfully');
		res.status(200).json(newPost);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.put('/edit/:id', async (req, res) => {
	try {
		const updatedPost = await UserPosts.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(updatedPost);
	} catch (error) {
		console.log(error);
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const removePost = await UserPosts.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(removePost);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
