const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    logIn,
} = require ('../controllers/users.js');
const checkAuthMiddleware = require ('../routes/validate-token');

const router = require ('express').Router ();

router.get('/', checkAuthMiddleware, getUsers);
router.post('/login', logIn);
router.post('/create', checkAuthMiddleware, createUser);
router.put('/:id',checkAuthMiddleware, updateUser);
router.put('/activate/:id', checkAuthMiddleware, activateUser);
router.delete('/:id',checkAuthMiddleware, deleteUser);

module.exports = router;