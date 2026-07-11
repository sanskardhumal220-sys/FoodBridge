import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Clock, Users, Leaf, Check, Flame, MessageCircle, Map as MapIcon, List, Camera, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatModal from '../components/ChatModal';
import LiveTrackingMap from '../components/LiveTrackingMap';
import RadarMapComponent from '../components/RadarMapComponent';
import FreshnessBadge from '../components/FreshnessBadge';
import { useTranslation } from 'react-i18next';
import { triggerNotification } from '../components/ToastProvider';
const NGODashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('available'); // 'available' | 'rescues'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [donations, setDonations] = useState([]);
  const [myRescues, setMyRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: 'Demo NGO',
    role: 'NGO'
  });

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  // Tracking State
  const [trackingDonation, setTrackingDonation] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo')) || {
      name: 'Demo NGO',
      role: 'NGO'
    };
    setUserInfo(user);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => fetchData(user, pos.coords.latitude, pos.coords.longitude), () => fetchData(user));
    } else {
      fetchData(user);
    }
  }, []);
  const fetchData = async (user, lat = null, lng = null) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        status: 'Available'
      });
      if (lat && lng) {
        queryParams.append('userLat', lat);
        queryParams.append('userLng', lng);
      }
      const availableReq = axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const rescuesReq = axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations?acceptedBy=${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const [availableRes, rescuesRes] = await Promise.all([availableReq, rescuesReq]);
      const formatDonation = d => ({
        ...d,
        lat: d.location?.lat,
        lng: d.location?.lng
      });
      setDonations(availableRes.data.map(formatDonation));
      setMyRescues(rescuesRes.data.map(formatDonation));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const acceptDonation = async id => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations/${id}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      fetchData(userInfo); // Refresh lists
      alert('Donation successfully claimed! Please check "My Rescues" to coordinate.');
      setActiveTab('rescues'); // Switch to rescues tab automatically
      setViewMode('list');
    } catch (error) {
      alert('Failed to accept donation');
    }
  };
  const isUrgent = expiryTime => {
    const diff = new Date(expiryTime).getTime() - Date.now();
    return diff > 0 && diff <= 4 * 60 * 60 * 1000; // Less than or equal to 4 hours
  };
  const openChat = id => {
    setSelectedDonationId(id);
    setIsChatOpen(true);
  };
  const verifyDelivery = async id => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations/${id}/deliver`, {}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      fetchData(userInfo);
      triggerNotification(`✅ Delivery Verified successfully!`);
    } catch (error) {
      alert('Failed to verify delivery: ' + (error.response?.data?.message || error.message));
    }
  };

  // Prepare markers for the map view
  const mapMarkers = donations.map(d => ({
    id: d._id,
    lat: d.lat || 19.0760,
    // fallback
    lng: d.lng || 72.8777,
    title: d.foodType,
    subtitle: `From: ${d.donor?.name}`,
    isUrgent: isUrgent(d.expiryTime),
    popupContent: <div className="mt-2 space-y-2">
        <p className="text-xs flex items-center text-gray-700"><Users size={12} className="mr-1" /> {t('ngo_dashboard.feeds')} {d.foodBrainData?.peopleFed || parseInt(d.quantity) || 5} {t('ngo_dashboard.people')}</p>
        <p className="text-xs flex items-center text-gray-700 font-semibold">{t("n_g_o_dashboard.text1")}{d.quantity}</p>
        <p className="text-xs flex items-center text-red-500 font-bold"><Clock size={12} className="mr-1" /> {t('ngo_dashboard.expires')} {new Date(d.expiryTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <button onClick={() => acceptDonation(d._id)} className="w-full bg-primary-500 text-white py-1 rounded text-xs font-bold mt-2 hover:bg-primary-600 transition-colors">
          {t('ngo_dashboard.accept_rescue')}
        </button>
      </div>
  }));
  return <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold dark:text-white text-center sm:text-left w-full sm:w-auto">{t('ngo_dashboard.title')}</h2>
        
        {/* Tabs */}
        <div className="w-full sm:w-auto bg-white dark:bg-gray-800 p-1 rounded-xl flex shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar justify-start">
          <button onClick={() => setActiveTab('available')} className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'available' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {t('ngo_dashboard.tab_available')}
          </button>
          <button onClick={() => setActiveTab('rescues')} className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'rescues' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {t('ngo_dashboard.tab_rescues')}
          </button>
        </div>
      </div>

      {activeTab === 'available' && <div className="flex justify-end mb-4">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg flex shadow-sm border border-gray-200 dark:border-gray-700">
            <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
              <List size={16} /> {t('ngo_dashboard.list_view')}
            </button>
            <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
              <MapIcon size={16} /> {t('ngo_dashboard.map_view')}
            </button>
          </div>
        </div>}
      
      {loading ? <p className="dark:text-white text-center py-10">{t('ngo_dashboard.loading')}</p> : activeTab === 'available' ?
    // Available Tab
    donations.length === 0 ? <div className="glass p-12 text-center rounded-3xl">
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('ngo_dashboard.no_available')}</p>
          </div> : viewMode === 'map' ? <RadarMapComponent markers={mapMarkers} className="h-[400px] lg:h-[600px]" /> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation, index) => {
        const urgent = isUrgent(donation.expiryTime);
        return <motion.div initial={{
          opacity: 0,
          y: 30,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} transition={{
          delay: index * 0.1,
          type: 'spring',
          stiffness: 100
        }} key={donation._id} whileHover={{
          y: -5,
          scale: 1.02
        }} className={`glass rounded-[2rem] overflow-hidden flex flex-col border-2 transition-all duration-300 ${urgent ? 'border-red-500/70 shadow-lg shadow-red-500/20 hover:shadow-red-500/40' : 'border-transparent hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/20'}`}>
                  <div className="relative">
                    {donation.image ? <img src={donation.image} alt={donation.foodType} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                         <span className="text-gray-400">{t("n_g_o_dashboard.text2")}</span>
                      </div>}
                    {urgent && <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg shadow-red-500/50 animate-pulse">
                        <Flame size={16} /> {t('ngo_dashboard.urgent')}
                      </div>}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold dark:text-white">{donation.foodType}</h3>
                      {donation.foodBrainData && <div className="ml-2 shrink-0">
                          <FreshnessBadge foodBrainData={donation.foodBrainData} />
                        </div>}
                    </div>
                    
                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users size={16} className="mr-2 text-primary-500" />
                        <span>{t('ngo_dashboard.feeds')} {donation.foodBrainData?.peopleFed || parseInt(donation.quantity) || 5} {t('ngo_dashboard.people')}{t("n_g_o_dashboard.text3")}{donation.quantity})</span>
                      </div>
                      <div className={`flex items-center text-sm font-medium ${urgent ? 'text-red-500 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        <Clock size={16} className={`mr-2 ${urgent ? 'text-red-500' : 'text-primary-500'}`} />
                        <span>{t('ngo_dashboard.expires')} {new Date(donation.expiryTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={16} className="mr-2 text-primary-500" />
                        <span>{t('ngo_dashboard.donor')} {donation.donor?.name || 'Unknown'}</span>
                      </div>
                    </div>

                    <button onClick={() => acceptDonation(donation._id)} className={`w-full text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${urgent ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' : 'bg-primary-500 hover:bg-primary-600'}`}>
                      <Check size={20} /> {t('ngo_dashboard.accept_rescue')}
                    </button>
                  </div>
                </motion.div>;
      })}
            </div> :
    // My Rescues Tab
    myRescues.length === 0 ? <div className="glass p-12 text-center rounded-3xl">
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('ngo_dashboard.no_rescues')}</p>
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRescues.map((donation, index) => <motion.div initial={{
        opacity: 0,
        y: 30,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }} key={donation._id} whileHover={{
        y: -5,
        scale: 1.02
      }} className="glass rounded-[2rem] overflow-hidden flex flex-col border-2 border-transparent hover:border-primary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                <div className="relative">
                  {donation.image ? <img src={donation.image} alt={donation.foodType} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">{t("n_g_o_dashboard.text4")}</div>}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-md capitalize">
                    {donation.status === 'PickedUp' ? 'Volunteer on the way 🚚' : donation.status === 'Completed' ? 'Delivered ✅' : donation.status.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold dark:text-white">{donation.foodType}</h3>
                    {donation.foodBrainData && <div className="ml-2 shrink-0">
                        <FreshnessBadge foodBrainData={donation.foodBrainData} />
                      </div>}
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users size={16} className="mr-2 text-primary-500" />
                      <span>{t('ngo_dashboard.feeds')} {donation.foodBrainData?.peopleFed || parseInt(donation.quantity) || 5} {t('ngo_dashboard.people')}{t("n_g_o_dashboard.text5")}{donation.quantity})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2 text-primary-500" />
                      <span>
                        {t('ngo_dashboard.donor')} {donation.donor?.name || 'Unknown'}
                        {donation.distance !== undefined && <span className="ml-2 font-semibold text-primary-600 dark:text-primary-400">({donation.distance.toFixed(1)}{t("n_g_o_dashboard.text6")}</span>}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => openChat(donation._id)} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800">
                    <MessageCircle size={20} /> {t('ngo_dashboard.chat_donor')}
                  </button>

                  {donation.status === 'PickedUp' && <div className="flex flex-col gap-2 mt-3">
                      <button onClick={() => setTrackingDonation(donation)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                        <Navigation size={20} />{t("n_g_o_dashboard.text7")}</button>
                      <button onClick={() => verifyDelivery(donation._id)} className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30">
                        <Check size={20} />{t("n_g_o_dashboard.text8")}</button>
                    </div>}
                </div>
              </motion.div>)}
          </div>}

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} donationId={selectedDonationId} currentUser={userInfo} />

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
              <LiveTrackingMap donationId={trackingDonation._id} pickupLocation={trackingDonation.location} dropoffLocation={trackingDonation.acceptedBy?.location} isVolunteer={false} onClose={() => setTrackingDonation(null)} />
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
};
export default NGODashboard;