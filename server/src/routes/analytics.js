const express = require('express');
const { trackVisit, getStats } = require('../controllers/analyticsController');

const router = express.Router();

router.post('/track', trackVisit);
router.get('/stats', getStats);

module.exports = router;
