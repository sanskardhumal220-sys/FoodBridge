const express = require('express');
const router = express.Router();
const { createDonation, getDonations, acceptDonation, claimDelivery, deliverDonation, analyzeFoodFreshness, getDonationMessages } = require('../controllers/donationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/analyze', protect, analyzeFoodFreshness);

router.route('/')
  .post(protect, createDonation)
  .get(protect, getDonations);

router.route('/:id/accept').put(protect, acceptDonation);
router.route('/:id/claim').put(protect, claimDelivery);
router.route('/:id/deliver').put(protect, deliverDonation);
router.route('/:id/messages').get(protect, getDonationMessages);

module.exports = router;
