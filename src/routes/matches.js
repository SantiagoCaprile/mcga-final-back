const {
    getMatches,
    createMatch,
    updateMatch,
    deleteMatch,
} = require('../controllers/matches');

const router = require('express').Router();
const checkAuthMiddleware = require('../routes/validate-token');

router.get('/', checkAuthMiddleware, getMatches);
router.post('/create', checkAuthMiddleware, createMatch);
router.put('/:id', checkAuthMiddleware, updateMatch);
router.delete('/:id', checkAuthMiddleware, deleteMatch);

module.exports = router;