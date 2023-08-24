const express = require('express');
const router = express.Router();
const post = require('./post.router')

router.use('/api/posts', post);
module.exports = router;