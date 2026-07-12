const express = require('express');
const router = express.Router();
const { createDonation, getDonations, acceptDonation, verifyPickup, verifyDelivery, analyzeFoodFreshness, getDonationMessages } = require('../controllers/donationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/analyze', protect, analyzeFoodFreshness);

router.route('/')
  .post(protect, createDonation)
  .get(protect, getDonations);

router.route('/:id/accept').put(protect, acceptDonation);
router.route('/:id/verify-pickup').post(protect, verifyPickup);
router.route('/:id/verify-delivery').post(protect, verifyDelivery);
router.route('/:id/messages').get(protect, getDonationMessages);

module.exports = router;
