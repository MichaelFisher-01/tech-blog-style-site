const router = require('express').Router();
const withAuth = require('../utils/auth');
const { UserPosts, Accounts, Comments } = require('../models');
// Homepage Route
router.get('/', async (req, res) => {
	try {
		if (req.session.viewCount) {
			req.session.viewCount++;
		} else {
			req.session.viewCount = 1;
		}

		const allPosts = await UserPosts.findAll();

		const postArray = allPosts.map((posts) => posts.get({ plain: true }));

		res.render('homepage', {
			postArray,
			viewCount: req.session.viewCount,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});
// Account based Routes
router.get('/login', async (req, res) => {
	try {
		res.render('loginPage', {
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/signUp', async (req, res) => {
	try {
		res.render('signUpPage');
	} catch (error) {
		res.status(500).json(error);
	}
});

//Post Based Routes
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		console.log(req.session.userName);
		const createdPosts = await UserPosts.findAll({
			where: { creator: req.session.userName },
		});
		const posts = createdPosts.map((post) => post.get({ plain: true }));
		console.log(posts);
		res.render('dashboard', {
			posts,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		console.log(error);
	}
});

router.get('/createPost', withAuth, async (req, res) => {
	try {
		res.render('createPost', {
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		console.log(error);
	}
});

router.get('/editPost/:id', withAuth, async (req, res) => {
	try {
		const postData = await UserPosts.findByPk(req.params.id);
		const currentPost = postData.get({ plain: true });
		res.render('editPost', {
			currentPost,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
