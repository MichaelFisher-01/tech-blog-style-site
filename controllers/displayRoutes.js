const router = require('express').Router();
const withAuth = require('../utils/auth');
const { UserPosts, Accounts, Comments } = require('../models');
// Generates the Homepage and sends over all the posts that have been created.
router.get('/', async (req, res) => {
	try {
		//Store all posts in the db
		const allPosts = await UserPosts.findAll();
		//Convert all of those posts to a format with only the data we need.
		const postArray = allPosts.map((posts) => posts.get({ plain: true }));
		//Render the home page and send over the post data, login status and current username.
		res.render('homepage', {
			postArray,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});
// Generates teh login page
router.get('/login', async (req, res) => {
	try {
		//Send over the current login status and the current user if they exist.
		//Mostly just so the current user that shows in the corner still works.
		res.render('loginPage', {
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});
// Creates a sign up page
router.get('/signUp', async (req, res) => {
	try {
		//Sends the current login status and username just for display of current user on the page.
		res.render('signUpPage', {
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

//Generates the dashboard after login, if the user is not logged in they will be redirected to the login page.
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		//Find all mosts that are tied to the currently logged in user.
		const createdPosts = await UserPosts.findAll({
			where: { creator: req.session.userName },
		});
		//Convert the posts to a new array that only conatins the data we need
		const posts = createdPosts.map((post) => post.get({ plain: true }));
		//Render the dashboard page with the all the posts that matched the user, also using the login status and current user to verify who is logged in and display that information.
		res.render('dashboard', {
			posts,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});
//Generated a page to create new posts, if there is no one logged in then it will redirect to the login page.
router.get('/createPost', withAuth, async (req, res) => {
	try {
		//Creates the page and sends the current logged in user data.
		res.render('createPost', {
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});
//Created a page that will allow for editing and deleting posts. If no one is logged in redirects to the log in screen.
router.get('/editPost/:id', withAuth, async (req, res) => {
	try {
		//This will grab the post that matches the id of the post we clicked on
		const postData = await UserPosts.findByPk(req.params.id);
		//Transforming that post into just the data we need
		const currentPost = postData.get({ plain: true });
		//Rendering the page and sending the currently logged in user information as well as the post information matching our previous database search.
		res.render('editPost', {
			currentPost,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/comments/:id', async (req, res) => {
	try {
		const getPost = await UserPosts.findByPk(req.params.id);
		const postData = getPost.get({ plain: true });
		const getComments = await Comments.findAll({
			where: { post_id: req.params.id },
		});
		const allComments = getComments.map((comment) =>
			comment.get({ plain: true })
		);
		res.render('commentsPage', {
			allComments,
			postData,
			loginStatus: req.session.loginStatus,
			currentUser: req.session.userName,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
