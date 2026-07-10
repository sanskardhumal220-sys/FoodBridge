// Mock Notification Service for FoodBridge
// In a real environment, you would use actual credentials from process.env

// We still import them to ensure they exist (as per dependencies)
const nodemailer = require('nodemailer');
const twilio = require('twilio');

/**
 * Mocks sending an email
 */
const sendEmailNotification = async ({ to, subject, body }) => {
  console.log('\n=============================================');
  console.log('📧 MOCK EMAIL NOTIFICATION SENT');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('---------------------------------------------');
  console.log(body);
  console.log('=============================================\n');
  return true;
};

/**
 * Mocks sending an SMS
 */
const sendSMSNotification = async ({ to, message }) => {
  console.log('\n=============================================');
  console.log('📱 MOCK SMS NOTIFICATION SENT');
  console.log(`To: ${to}`);
  console.log('---------------------------------------------');
  console.log(message);
  console.log('=============================================\n');
  return true;
};

/**
 * Helper to dispatch all notifications (Email, SMS, and Real-time if needed)
 * @param {Object} io - Socket.io instance
 * @param {Object} donation - The donation document (populated)
 * @param {String} eventType - The type of event (created, accepted, claimed, delivered)
 */
const notifyStakeholders = async (io, donation, eventType) => {
  // 1. Emit Real-time Socket.io Event (Already handled in controller usually, but we can centralize or keep it there. 
  // Let's assume the controller still does io.emit, we just do Email/SMS here).
  
  const donorEmail = donation.donor?.email || 'donor@example.com';
  const donorPhone = donation.donor?.phone || '+919876543210';
  const foodType = donation.foodType;

  switch (eventType) {
    case 'created':
      const targetNgo = donation.targetedNgoName;
      // Notify nearby NGOs (Mocking a broadcast to NGOs)
      await sendEmailNotification({
        to: targetNgo ? `${targetNgo.replace(/\s+/g, '').toLowerCase()}@foodbridge.org` : 'nearby-ngos@foodbridge.org',
        subject: `New Food Donation Alert: ${foodType}`,
        body: `A new donation of ${foodType} (${donation.quantity}) is available for ${targetNgo ? targetNgo : 'pickup nearby'}. Log in to claim it!`
      });
      await sendSMSNotification({
        to: targetNgo ? targetNgo : 'NGO_BROADCAST_LIST',
        message: `FoodBridge: New donation of ${foodType} targeted for ${targetNgo ? targetNgo : 'you'}. Claim it quickly!`
      });
      break;

    case 'accepted':
      const ngoName = donation.acceptedBy?.name || 'An NGO';
      await sendEmailNotification({
        to: donorEmail,
        subject: `Your donation was accepted!`,
        body: `Great news! ${ngoName} has accepted your donation of ${foodType}. A volunteer will be assigned shortly.`
      });
      await sendSMSNotification({
        to: donorPhone,
        message: `FoodBridge: ${ngoName} accepted your ${foodType} donation.`
      });
      break;

    case 'claimed':
      const volunteerName = donation.volunteer?.name || 'A volunteer';
      await sendEmailNotification({
        to: donorEmail,
        subject: `Volunteer is on the way!`,
        body: `${volunteerName} is currently on their way to pick up your donation of ${foodType}.`
      });
      await sendSMSNotification({
        to: donorPhone,
        message: `FoodBridge: Volunteer ${volunteerName} is on the way for pickup.`
      });
      break;

    case 'delivered':
      await sendEmailNotification({
        to: donorEmail,
        subject: `Donation Delivered Successfully!`,
        body: `Thank you for your generosity! Your donation of ${foodType} has been successfully delivered and will nourish those in need.`
      });
      await sendSMSNotification({
        to: donorPhone,
        message: `FoodBridge: Success! Your ${foodType} donation was delivered. Thank you!`
      });
      break;

    default:
      console.log('Unknown event type for notifications');
  }
};

module.exports = {
  sendEmailNotification,
  sendSMSNotification,
  notifyStakeholders
};
