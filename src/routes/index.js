const express = require('express');
const usersRoutes = require('./users');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('PING - Server OK');
});

router.use('/users', usersRoutes);

module.exports = router;