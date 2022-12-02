const {
    getMatches,
    createMatch,
    updateMatch,
    deleteMatch,
    addUserResult,
    updateUserResult,
} = require('../controllers/matches');

const router = require('express').Router();

router.get('/', getMatches);
router.post('/create', createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);
router.post('/addUserResult/:id', addUserResult); //id = match id
router.put('/updateUserResult/:id', updateUserResult); //id = result id in match

module.exports = router;