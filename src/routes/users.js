const {
    getUsers,
    validateUser,
    createUser,
    updateUser,
    deleteUser,
    activateUser
} = require ('../controllers/users.js');

const router = require ('express').Router ();

router.get('/', getUsers);
router.post('/', validateUser);
router.post('/create', createUser);
router.put('/:id', updateUser);
router.put('/activate/:id', activateUser);
router.delete('/:id', deleteUser);

module.exports = router;