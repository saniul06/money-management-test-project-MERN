const router = require('express').Router();
const {
    create,
    getAll,
    getSingleTransaction,
    updateTransaction,
    remove
} = require('../controllers/transactionController');

const authenticate = require('../authenticate');

router.get('/', authenticate, getAll);

router.post('/', authenticate, create);

router.get('/:transactionId', getSingleTransaction);

router.put('/:transactionId', updateTransaction);

router.delete('/:transactionId', authenticate, remove);

module.exports = router;
