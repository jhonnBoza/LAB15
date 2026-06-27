const router = require('express').Router();
const { getAll, create, remove } = require('../controllers/category.controller');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', verifyToken, requireRole('ADMIN'), create);
router.delete('/:id', verifyToken, requireRole('ADMIN'), remove);

module.exports = router;
