const express = require('express');
const usersRoutes = require('./users');
const matchesRoutes = require('./matches');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('PING - Server OK');
});

router.use('/users', usersRoutes);
router.use('/matches', matchesRoutes);

module.exports = router;