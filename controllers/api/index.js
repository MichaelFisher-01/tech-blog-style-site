const router = require('express').Router();
const accountRoutes = require('./accountRoutes');

router.use('/account', accountRoutes);

module.exports = router;
