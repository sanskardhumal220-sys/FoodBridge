const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  foodType: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  prepTime: {
    type: Date,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  location: {
    address: String,
    lat: Number,
    lng: Number,
  },
  image: {
    type: String, // Base64 or URL
  },
  status: {
    type: String,
    enum: ['Available', 'Accepted', 'PickedUp', 'Completed'],
    default: 'Available',
  },
  targetedNgoName: {
    type: String,
    default: null
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pickupCode: {
    type: String,
  },
  deliveryCode: {
    type: String,
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  foodBrainData: {
    freshnessScore: Number, // 0-100
    estimatedSpoilage: String,
    peopleFed: Number,
    safetyScore: String, // e.g., 'High', 'Medium', 'Low'
    co2Saved: Number, // in kg
  }
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
