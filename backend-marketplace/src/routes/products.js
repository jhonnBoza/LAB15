const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../controllers/product.controller');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', verifyToken, requireRole('ADMIN'), create);
router.put('/:id', verifyToken, requireRole('ADMIN'), update);
router.delete('/:id', verifyToken, requireRole('ADMIN'), remove);

module.exports = router;
