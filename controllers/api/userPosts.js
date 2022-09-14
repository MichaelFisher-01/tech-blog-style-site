const router = require('express').Router();
const { UserPosts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//Route to create a post
router.post('/create', withAuth, async (req, res) => {
	try {
		const newPost = await UserPosts.create({
			//take everything that is sent from the createPost page
			//Add the stored username from the session
			...req.body,
			creator: req.session.userName,
		});
		res.status(200).json(newPost);
	} catch (error) {
		res.status(500).json(error);
	}
});
// Route to change already created posts
router.put('/edit/:id', async (req, res) => {
	try {
		//Find the post that has a matching ID to the page we are looking at
		//Then update with the information sent from the editPost page.
		const updatedPost = await UserPosts.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Route to delete a post
router.delete('/delete/:id', async (req, res) => {
	try {
		//Find a post in the database with a matching id to the post page we are on at the time of clicking delete.
		const removePost = await UserPosts.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(removePost);
	} catch (error) {
		console.log(error);
	}
});

router.post('/createComment', async (req, res) => {
	try {
		const newComment = await Comments.create({
			...req.body,
		});
		res.status(200).json(newComment);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
