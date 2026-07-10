const Donation = require('../models/Donation');
const { isValidCoordinate } = require('../utils/location');
const { calculateDistance } = require('../utils/distance');
const { notifyStakeholders } = require('../utils/notifications');

// @desc    Create new donation with FoodBrain Analysis
// @route   POST /api/donations
// @access  Private (Donor only)
const createDonation = async (req, res) => {
  try {
    const { foodType, quantity, prepTime, expiryTime, location, image, foodBrainData: clientFoodBrainData, targetedNgoName } = req.body;

    if (!location || !isValidCoordinate(location.lat, location.lng)) {
      return res.status(400).json({ message: 'Valid location coordinates (lat, lng) are required.' });
    }

    let foodBrainData = clientFoodBrainData;

    // Fallback if frontend didn't send pre-analyzed data
    if (!foodBrainData) {
      foodBrainData = {
        freshnessScore: Math.floor(Math.random() * 30) + 70, // 70-100
        estimatedSpoilage: `${Math.floor(Math.random() * 24) + 12} hours`,
        peopleFed: Math.floor(parseInt(quantity) * 2.5) || 5,
        safetyScore: 'High',
        co2Saved: (Math.floor(parseInt(quantity) * 2.5) || 5) * 1.2
      };

      if (foodBrainData.freshnessScore < 80) foodBrainData.safetyScore = 'Medium';
      if (foodBrainData.freshnessScore < 50) foodBrainData.safetyScore = 'Low';
    }

    const donation = new Donation({
      donor: req.user._id,
      foodType,
      quantity,
      prepTime,
      expiryTime,
      location,
      image,
      foodBrainData,
      status: 'Available',
      targetedNgoName
    });

    const createdDonation = await donation.save();
    
    // Emit real-time event to all connected clients
    req.app.get('io').emit('new_donation', createdDonation);

    // Smart Notifications (Email/SMS)
    await notifyStakeholders(req.app.get('io'), createdDonation, 'created');
    
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all available donations
// @route   GET /api/donations
// @access  Private
const getDonations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.donor) filter.donor = req.query.donor;
    if (req.query.acceptedBy) filter.acceptedBy = req.query.acceptedBy;
    if (req.query.volunteer) filter.volunteer = req.query.volunteer;

    const { userLat, userLng } = req.query;

    let donations = await Donation.find(filter)
      .populate('donor', 'name email location')
      .populate('acceptedBy', 'name location');
      
    // Convert to plain objects so we can add the virtual distance field
    donations = donations.map(d => d.toObject());

    if (userLat && userLng && !isNaN(parseFloat(userLat)) && !isNaN(parseFloat(userLng))) {
      const lat = parseFloat(userLat);
      const lng = parseFloat(userLng);
      
      donations = donations.map(donation => {
        if (donation.location && donation.location.lat && donation.location.lng) {
          donation.distance = calculateDistance(lat, lng, donation.location.lat, donation.location.lng);
        }
        return donation;
      });
      
      // Sort by distance (closest first), if distance exists
      donations.sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }
        if (a.distance !== undefined) return -1; // a has distance, prioritize
        if (b.distance !== undefined) return 1;  // b has distance, prioritize
        return 0;
      });
    }

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation status (Accept Pickup)
// @route   PUT /api/donations/:id/accept
// @access  Private (NGO/Volunteer)
const acceptDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      donation.status = 'Accepted';
      donation.acceptedBy = req.user._id;
      const updatedDonation = await donation.save();
      
      // Emit event
      req.app.get('io').emit('donation_accepted', updatedDonation);
      
      // Smart Notifications (Email/SMS)
      await notifyStakeholders(req.app.get('io'), updatedDonation, 'accepted');

      res.json(updatedDonation);
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation status (Claim Delivery)
// @route   PUT /api/donations/:id/claim
// @access  Private (Volunteer)
const claimDelivery = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      donation.status = 'PickedUp';
      donation.volunteer = req.user._id;
      const updatedDonation = await donation.save();

      // Emit event
      req.app.get('io').emit('delivery_claimed', updatedDonation);

      // Smart Notifications (Email/SMS)
      await notifyStakeholders(req.app.get('io'), updatedDonation, 'claimed');

      res.json(updatedDonation);
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation status (Mark Delivered)
// @route   PUT /api/donations/:id/deliver
// @access  Private (Volunteer)
const deliverDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      donation.status = 'Completed';
      const updatedDonation = await donation.save();
      
      // Emit event
      req.app.get('io').emit('donation_delivered', updatedDonation);
      
      // Smart Notifications (Email/SMS)
      await notifyStakeholders(req.app.get('io'), updatedDonation, 'delivered');

      res.json(updatedDonation);
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Analyze food freshness using AI
// @route   POST /api/donations/analyze
// @access  Private
const analyzeFoodFreshness = async (req, res) => {
  try {
    const { image, quantity } = req.body;

    let foodBrainData = {
      freshnessScore: Math.floor(Math.random() * 30) + 70, // 70-100
      estimatedSpoilage: `${Math.floor(Math.random() * 24) + 12} hours`,
      peopleFed: Math.floor(parseInt(quantity || '5') * 2.5) || 5,
      safetyScore: 'High',
      co2Saved: (Math.floor(parseInt(quantity || '5') * 2.5) || 5) * 1.2
    };

    if (foodBrainData.freshnessScore < 80) foodBrainData.safetyScore = 'Medium';
    if (foodBrainData.freshnessScore < 50) foodBrainData.safetyScore = 'Low';

    if (image && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_api_key_here') {
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Strip data prefix from base64 if it exists
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `Analyze this food image. We are determining if it is safe to donate. Provide a JSON response matching exactly this structure (no markdown tags, just the raw JSON object):
        {
          "freshnessScore": <number between 0-100>,
          "estimatedSpoilage": "<string like '24 hours'>",
          "peopleFed": <number, estimate based on image, or ${quantity || 5} if it seems reasonable>,
          "safetyScore": "<'High' or 'Medium' or 'Low'>",
          "co2Saved": <number, approx peopleFed * 1.2>
        }`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
                        { text: prompt }
                    ]
                }
            ]
        });

        if (response.text) {
           let cleanedText = response.text.trim();
           if (cleanedText.startsWith('```json')) {
               cleanedText = cleanedText.replace(/^```json/, '').replace(/```$/, '').trim();
           } else if (cleanedText.startsWith('```')) {
               cleanedText = cleanedText.replace(/^```/, '').replace(/```$/, '').trim();
           }
           const aiParsed = JSON.parse(cleanedText);
           foodBrainData = { ...foodBrainData, ...aiParsed };
        }
      } catch (aiError) {
        console.error('Gemini AI failed, falling back to mock data:', aiError.message);
      }
    }

    res.json({ foodBrainData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  acceptDonation,
  claimDelivery,
  deliverDonation,
  analyzeFoodFreshness
};
