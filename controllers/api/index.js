//Grabbing just the router files from the express library.
const router = require('express').Router();
// Grab the created routes from the accountRoutes file so it epxorts with all other routes
const accountRoutes = require('./accountRoutes');
// Grab all the create routes from the userPosts so we can export it with all other routes.
const postRoutes = require('./userPosts');

//we will have this new router we created for the index use
router.use('/account', accountRoutes);
router.use('/posts', postRoutes);

module.exports = router;
