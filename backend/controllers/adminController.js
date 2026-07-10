const User = require('../models/User');

// @desc    Get all pending NGOs
// @route   GET /api/admin/ngos/pending
// @access  Private (Admin only)
const getPendingNGOs = async (req, res) => {
  try {
    const pendingNGOs = await User.find({ role: 'NGO', verificationStatus: 'Pending' }).select('-password');
    res.json(pendingNGOs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify or Reject NGO
// @route   PUT /api/admin/ngos/:id/verify
// @access  Private (Admin only)
const verifyNGO = async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const ngo = await User.findById(req.params.id);

    if (ngo && ngo.role === 'NGO') {
      ngo.verificationStatus = status;
      const updatedNGO = await ngo.save();
      res.json(updatedNGO);
    } else {
      res.status(404).json({ message: 'NGO not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingNGOs,
  verifyNGO,
};
