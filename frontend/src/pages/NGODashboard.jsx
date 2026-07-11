import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Package, Star, Clock, AlertTriangle, Search, Activity, Truck } from 'lucide-react';
import ChatModal from '../components/ChatModal';
import LiveTrackingMap from '../components/LiveTrackingMap';
import RadarMapComponent from '../components/RadarMapComponent';
import FreshnessBadge from '../components/FreshnessBadge';
import { triggerNotification } from '../components/ToastProvider';

const NGODashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'available' | 'rescues'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [donations, setDonations] = useState([]);
  const [myRescues, setMyRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: 'Demo NGO', role: 'NGO' });

  // Map state
  const [ngoLocation, setNgoLocation] = useState({ lat: 26.2183, lng: 78.1828 });

  // Chat/Tracking
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [trackingDonation, setTrackingDonation] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Demo NGO', role: 'NGO' };
    setUserInfo(user);
    if (activeTab === 'available' || activeTab === 'overview') fetchAvailableDonations(user.token);
    if (activeTab === 'rescues' || activeTab === 'overview') fetchMyRescues(user._id, user.token);
  }, [activeTab]);

  const fetchAvailableDonations = async (token) => {
    try {
      const { data } = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(data.filter(d => d.status === 'pending'));
    } catch (error) { console.error('Failed to fetch', error); }
    setLoading(false);
  };

  const fetchMyRescues = async (ngoId, token) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/donations?ngo=${ngoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyRescues(data);
    } catch (error) { console.error('Failed to fetch rescues', error); }
  };

  const claimDonation = async (donationId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/donations/${donationId}/status`, {
        status: 'accepted'
      }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
      triggerNotification('Donation successfully claimed! Volunteers are being notified.');
      fetchAvailableDonations(userInfo.token);
    } catch (error) { alert('Failed to claim'); }
  };

  const openChat = (id) => {
    setSelectedDonationId(id);
    setIsChatOpen(true);
  };

  const donationMarkers = donations.map(d => ({
    id: d._id, lat: d.location.lat, lng: d.location.lng, title: d.foodType, subtitle: 'Available for rescue', isUrgent: true,
    popupContent: <button className="w-full bg-primary-500 text-white py-1 rounded text-xs font-bold mt-2" onClick={() => claimDonation(d._id)}>Claim Now</button>
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">NGO Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Discover nearby surplus food and manage your rescues.</p>
        </div>
        
        <div className="glass-card p-1.5 rounded-2xl flex shadow-xl border border-white/40 dark:border-gray-800 w-full md:w-auto overflow-x-auto">
          {['overview', 'available', 'rescues'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:bg-primary-900/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500"><AlertTriangle size={24}/></div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-1">Nearby Donations</h3>
              <div className="text-4xl font-black text-gray-900 dark:text-white">{donations.length}</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500"><CheckCircle size={24}/></div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-1">Claimed Requests</h3>
              <div className="text-4xl font-black text-gray-900 dark:text-white">{myRescues.length}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500"><Truck size={24}/></div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-1">Pickup Status</h3>
              <div className="text-4xl font-black text-gray-900 dark:text-white">Active</div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-2 rounded-3xl overflow-hidden h-[500px] relative border border-gray-200 dark:border-gray-800">
             <RadarMapComponent markers={donationMarkers} donorLocation={ngoLocation} center={[ngoLocation.lat, ngoLocation.lng]} zoom={12} className="w-full h-full rounded-[1.5rem]" />
             <div className="absolute top-6 left-6 z-[400] glass p-4 rounded-2xl">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Search size={16} className="text-primary-500"/> Live Radar Integration</h3>
               <p className="text-xs text-gray-500 mt-1">Scanning for local surplus food...</p>
             </div>
          </motion.div>
        </div>
      )}
      
      {activeTab === 'available' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? <div className="col-span-3 text-center p-12 text-gray-500 animate-pulse">Loading donations...</div> : donations.map((donation, index) => (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} key={donation._id} className="glass-card rounded-3xl p-6 hover:-translate-y-2 transition-all">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold dark:text-white">{donation.foodType}</h3>
                 <span className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1"><AlertTriangle size={12}/> Urgent</span>
               </div>
               {donation.foodBrainData && <div className="mb-4"><FreshnessBadge foodBrainData={donation.foodBrainData}/></div>}
               <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex items-center gap-2"><MapPin size={16}/> {donation.location.address}</p>
               <button onClick={() => claimDonation(donation._id)} className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary-500/30">Claim This Donation</button>
             </motion.div>
           ))}
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} donationId={selectedDonationId} currentUser={userInfo} />
    </div>
  );
};
export default NGODashboard;