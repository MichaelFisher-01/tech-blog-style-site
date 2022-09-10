const router = require('express').Router();

const accountRoutes = require('./accountRoutes');
const postRoutes = require('./userPosts');

router.use('/account', accountRoutes);
router.use('/posts', postRoutes);

module.exports = router;
