const router = require('express').Router();

const displayPages = require('./displayRoutes');
const apiRoutes = require('./api');

router.use('/', displayPages);
router.use('/api', apiRoutes);

module.exports = router;
