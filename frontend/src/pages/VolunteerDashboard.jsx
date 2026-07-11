import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Clock, Users, Leaf, Truck, CheckCircle2, MessageCircle, Camera, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveTrackingMap from '../components/LiveTrackingMap';
import { triggerNotification } from '../components/ToastProvider';
import ChatModal from '../components/ChatModal';
import { useTranslation } from 'react-i18next';
import FreshnessBadge from '../components/FreshnessBadge';
const VolunteerDashboard = () => {
  const { t } = useTranslation();

  const {
    t
  } = useTranslation();
  const [availableDeliveries, setAvailableDeliveries] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  // Tracking State
  const [trackingDonation, setTrackingDonation] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => fetchDonations(userInfo, pos.coords.latitude, pos.coords.longitude), () => fetchDonations(userInfo));
    } else {
      fetchDonations(userInfo);
    }
  }, []);
  const fetchDonations = async (currentUser, lat = null, lng = null) => {
    try {
      const queryParams = new URLSearchParams({
        status: 'Accepted'
      });
      if (lat && lng) {
        queryParams.append('userLat', lat);
        queryParams.append('userLng', lng);
      }
      const availableReq = axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      const mineReq = axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations?status=PickedUp&volunteer=${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      const [availableRes, mineRes] = await Promise.all([availableReq, mineReq]);
      setAvailableDeliveries(availableRes.data);
      setMyDeliveries(mineRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const claimDelivery = async id => {
    try {
      const {
        data
      } = await axios.put(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations/${id}/claim`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      fetchDonations(user); // Refresh lists

      triggerNotification(`🚚 Alert: You have successfully claimed the delivery for ${data.foodType}!`);
    } catch (error) {
      alert('Failed to claim delivery: ' + (error.response?.data?.message || error.message));
    }
  };
  const markDelivered = async id => {
    try {
      const {
        data
      } = await axios.put(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations/${id}/deliver`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      fetchDonations(user); // Refresh lists

      triggerNotification(`✅ Success! ${data.foodType} delivered.`);
    } catch (error) {
      alert('Failed to update status: ' + (error.response?.data?.message || error.message));
    }
  };
  const openChat = id => {
    setSelectedDonationId(id);
    setIsChatOpen(true);
  };
  return <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">{t('volunteer_dashboard.title')}</h2>
      
      {loading ? <p className="dark:text-white text-center py-10">{t('volunteer_dashboard.loading')}</p> : <div className="space-y-12">
          
          {/* Active Deliveries Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">{t('volunteer_dashboard.my_deliveries')}</h3>
            {myDeliveries.length === 0 ? <div className="glass p-8 text-center rounded-3xl">
                <p className="text-gray-500 dark:text-gray-400">{t('volunteer_dashboard.no_active_deliveries')}</p>
              </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myDeliveries.map((donation, index) => <DeliveryCard key={donation._id} donation={donation} index={index} actionText={t('volunteer_dashboard.mark_delivered')} actionIcon={<CheckCircle2 size={20} />} onAction={() => markDelivered(donation._id)} onChat={() => openChat(donation._id)} onTrack={() => setTrackingDonation(donation)} btnClass="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30" />)}
              </div>}
          </div>

          {/* Available for Pickup Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 dark:text-white">{t('volunteer_dashboard.ready_for_pickup')}</h3>
            {availableDeliveries.length === 0 ? <div className="glass p-8 text-center rounded-3xl">
                <p className="text-gray-500 dark:text-gray-400">{t('volunteer_dashboard.no_new_donations')}</p>
              </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDeliveries.map((donation, index) => <DeliveryCard key={donation._id} donation={donation} index={index} actionText="Claim Pickup" actionIcon={<CheckCircle2 size={20} />} onAction={() => claimDelivery(donation._id)} btnClass="bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30" />)}
              </div>}
          </div>

        </div>}

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} donationId={selectedDonationId} currentUser={user} />

      {/* Tracking Modal */}
      <AnimatePresence>
        {trackingDonation && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              <LiveTrackingMap donationId={trackingDonation._id} pickupLocation={trackingDonation.location} dropoffLocation={trackingDonation.acceptedBy?.location} isVolunteer={true} onClose={() => setTrackingDonation(null)} />
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
};
const DeliveryCard = ({
  donation,
  index,
  actionText,
  actionIcon,
  onAction,
  onChat,
  btnClass,
  onTrack
}) => {
  const {
    t
  } = useTranslation();
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.1
  }} className="glass rounded-3xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-all">
    {donation.image ? <img src={donation.image} alt={donation.foodType} className="w-full h-48 object-cover" /> : <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Truck className="text-gray-400" size={48} />
      </div>}
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold dark:text-white">{donation.foodType}</h3>
        {donation.foodBrainData && <div className="ml-2 shrink-0">
            <FreshnessBadge foodBrainData={donation.foodBrainData} />
          </div>}
      </div>
      
      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-2 text-primary-500" />
          <span>
            {t('volunteer_dashboard.from')} {donation.donor?.name || 'Donor'}
            {donation.distance !== undefined && <span className="ml-2 font-semibold text-primary-600 dark:text-primary-400">({donation.distance.toFixed(1)}{t("volunteer_dashboard.text1")}</span>}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Users size={16} className="mr-2 text-primary-500" />
          <span>{t('volunteer_dashboard.feeds')} {donation.foodBrainData?.peopleFed || parseInt(donation.quantity) || 5} {t('volunteer_dashboard.people')}{t("volunteer_dashboard.text2")}{donation.quantity})</span>
        </div>
        <div className="flex items-center text-sm text-red-500 dark:text-red-400 font-medium">
          <Clock size={16} className="mr-2" />
          <span>{t('volunteer_dashboard.deliver_before')} {new Date(donation.expiryTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {onChat && <button onClick={onChat} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800">
            <MessageCircle size={20} /> {t('volunteer_dashboard.open_chat')}
          </button>}

        {onTrack && <button onClick={onTrack} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
            <Navigation size={20} />{t("volunteer_dashboard.text3")}</button>}

        <button onClick={onAction} className={`w-full text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${btnClass}`}>
          {actionIcon} {actionText}
        </button>


      </div>
    </div>
  </motion.div>;
};
export default VolunteerDashboard;