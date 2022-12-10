const {
    getMatches,
    createMatch,
    updateMatch,
    deleteMatch,
    addUserResult,
    updateUserResult,
} = require('../controllers/matches');

const router = require('express').Router();
const checkAuthMiddleware = require('../routes/validate-token');

router.get('/', checkAuthMiddleware, getMatches);
router.post('/create', checkAuthMiddleware, createMatch);
router.put('/:id', checkAuthMiddleware, updateMatch);
router.delete('/:id', checkAuthMiddleware, deleteMatch);
router.post('/addUserResult/:id', checkAuthMiddleware, addUserResult); //id = match id
router.put('/updateUserResult/:id',checkAuthMiddleware, updateUserResult); //id = result id in match

module.exports = router;