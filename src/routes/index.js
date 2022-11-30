const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('PING - Server OK');
});

module.exports = router;