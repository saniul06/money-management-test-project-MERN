const router = require('express').Router();

const { login, register, getAll } = require('../controllers/userController');

router.post('/register/', register);

router.post('/login/', login);

router.get('/login/', (req, res) => {
    res.json({
        MM: 'I am in user router'
    });
});

router.get('/', getAll)

module.exports = router;
