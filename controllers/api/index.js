const router = require('express').Router();
const accountRoutes = require('./accountRoutes');

router.use('/login', accountRoutes);

module.exports = router;
