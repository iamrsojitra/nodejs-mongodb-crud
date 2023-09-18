const express = require('express');
const router = express.Router();

const post = require('./post.router');
const auth = require('./auth.router');

const authMiddleware = require("../middlewares/auth.middleware");

router.use('/api/auth', auth);
router.use('/api/posts', authMiddleware.authVerify, post);

module.exports = router;