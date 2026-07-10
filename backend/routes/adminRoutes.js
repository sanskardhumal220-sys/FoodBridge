const express = require('express');
const router = express.Router();
const { getPendingNGOs, verifyNGO } = require('../controllers/adminController');
// Assuming we have an auth middleware, but since we didn't use one for other routes, we'll keep it simple for demo.
// In a real app, add adminProtect middleware here.

router.get('/ngos/pending', getPendingNGOs);
router.put('/ngos/:id/verify', verifyNGO);

module.exports = router;
