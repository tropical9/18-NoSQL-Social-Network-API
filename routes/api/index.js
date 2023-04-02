const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');
const reactionRoutes = require('./reactions');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;


