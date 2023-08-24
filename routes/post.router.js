const router = require('express').Router();
const post = require('../controllers/post.controller');
 
router.post('/', post.add);
router.get('/', post.get);
router.get('/:id', post.getById);
router.delete('/:id', post.delete);
router.patch('/:id', post.update);

module.exports = router;