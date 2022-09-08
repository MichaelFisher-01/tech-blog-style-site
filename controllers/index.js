const router = require('express').Router();

const displayPages = require('./displayRoutes');

router.use('/', displayPages);

module.exports = router;
