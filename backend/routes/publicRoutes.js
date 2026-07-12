const express = require('express');
const router = express.Router();
const { getPublicStats, getNGOs } = require('../controllers/publicController');

router.get('/stats', getPublicStats);
router.get('/ngos', getNGOs);

module.exports = router;
