const express = require('express');
const { getTags, createTag } = require('../controllers/tags');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getTags)
    .post(protect, createTag);

module.exports = router;
