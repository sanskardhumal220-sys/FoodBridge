const Donation = require('../models/Donation');
const User = require('../models/User');

const getPublicStats = async (req, res) => {
  try {
    // 1. Calculate Total Meals Rescued and Carbon Saved
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalMeals: { $sum: "$foodBrainData.peopleFed" },
          totalCarbon: { $sum: "$foodBrainData.co2Saved" }
        }
      }
    ]);

    let mealsRescued = 0;
    let carbonSaved = 0;
    
    if (donationStats.length > 0) {
      mealsRescued = Math.round(donationStats[0].totalMeals || 0);
      carbonSaved = (donationStats[0].totalCarbon || 0).toFixed(1);
    }

    // 2. Count Active NGOs
    const activeNGOs = await User.countDocuments({ role: 'NGO', verificationStatus: 'Approved' });

    // 3. Count Cities Served (unique addresses)
    // In a real app with geocoding, we'd extract the city from the address.
    // Here we count the number of distinct addresses as an approximation of communities/cities.
    const citiesServed = (await User.distinct('location.address')).filter(Boolean).length;

    res.json({
      mealsRescued,
      activeNGOs,
      citiesServed,
      carbonSaved
    });
  } catch (error) {
    console.error('Error fetching public stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPublicStats
};
