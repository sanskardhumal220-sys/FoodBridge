import { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Send, CheckCircle, MapPin, Clock, MessageCircle, Truck, Navigation, Sparkles } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerNotification } from '../components/ToastProvider';
import ChatModal from '../components/ChatModal';
import LiveTrackingMap from '../components/LiveTrackingMap';
import RadarMapComponent from '../components/RadarMapComponent';
import FreshnessBadge from '../components/FreshnessBadge';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTranslation } from 'react-i18next';
import { rankNGOs } from '../utils/distance';
import { Star, Package } from 'lucide-react';
const DonorDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'my_donations' | 'nearby_ngos'

  // Creation Flow State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    unit: 'kg',
    prepTime: '',
    expiryTime: '',
    lat: null,
    lng: null,
    address: '',
    image: ''
  });
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Demo Donor',
    role: 'Donor'
  });

  // My Donations State
  const [myDonations, setMyDonations] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [trackingDonation, setTrackingDonation] = useState(null);

  // Nearby NGOs State
  const [donorLocation, setDonorLocation] = useState({
    lat: 26.2183,
    lng: 78.1828
  }); // Default: Gwalior, MP
  const [recommendedNgos, setRecommendedNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo')) || {
      name: 'Demo Donor',
      role: 'Donor'
    };
    setUserInfo(user);
    if (activeTab === 'my_donations' && user._id) {
      fetchMyDonations(user._id, user.token);
    }
  }, [activeTab]);
  const fetchMyDonations = async (userId, token) => {
    try {
      const {
        data
      } = await axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + ''}/api/donations?donor=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMyDonations(data);
    } catch (error) {
      console.error('Failed to fetch donations', error);
    }
  };
  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result
      });
    };
    if (file) reader.readAsDataURL(file);
  };
  const handleLocation = (lat, lng, address) => {
    setFormData(prev => ({
      ...prev,
      lat,
      lng,
      address: address || 'Fetching address...'
    }));
  };
  const submitDonation = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data
      } = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/donations', {
        foodType: formData.foodType,
        quantity: `${formData.quantity} ${formData.unit}`,
        prepTime: formData.prepTime,
        expiryTime: formData.expiryTime,
        location: {
          lat: formData.lat,
          lng: formData.lng,
          address: formData.address
        },
        image: formData.image,
        foodBrainData: aiResult,
        targetedNgoName: selectedNgo ? selectedNgo.name : null
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setAiResult(data.foodBrainData);
      setStep(3);
      triggerNotification(`🔔 Alert: ${userInfo.name} just posted a new donation of ${formData.foodType}!`);
    } catch (error) {
      alert('Error creating donation: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };
  const analyzeFreshness = async () => {
    if (!formData.image) return alert('Please upload an image first');
    setIsAnalyzing(true);
    try {
      const {
        data
      } = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/donations/analyze', {
        image: formData.image,
        quantity: formData.quantity ? `${formData.quantity} ${formData.unit}` : undefined
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setAiResult(data.foodBrainData);
      setFormData(prev => ({
        ...prev,
        foodType: data.foodBrainData.foodType || prev.foodType,
        quantity: data.foodBrainData.estimatedQuantity || prev.quantity,
        unit: data.foodBrainData.unit || prev.unit
      }));
      triggerNotification(`✨ AI Analysis Complete! Detected: ${data.foodBrainData.foodType || 'Food'}`);
      setStep(2);
    } catch (error) {
      alert('Error analyzing freshness: ' + (error.response?.data?.message || error.message));
    }
    setIsAnalyzing(false);
  };
  const openChat = id => {
    setSelectedDonationId(id);
    setIsChatOpen(true);
  };

  // Mock NGOs for Radar Map & Recommendations
  const mockNgos = [{
    id: 'g1',
    lat: 26.2183,
    lng: 78.1828,
    name: 'Ramakrishna Mission Ashrama Sharada Balgram',
    needed: 'Grains, Cooked Food',
    urgency: 'High',
    capacity: 500,
    verified: true,
    trustScore: 98
  }, {
    id: 'g2',
    lat: 26.2300,
    lng: 78.1900,
    name: 'Narayan Seva Sansthan',
    needed: 'Fresh Produce',
    urgency: 'Medium',
    capacity: 200,
    verified: true,
    trustScore: 95
  }, {
    id: 'g3',
    lat: 26.2050,
    lng: 78.1650,
    name: 'The Power Of Education Foundations',
    needed: 'Leftover Meals',
    urgency: 'Low',
    capacity: 150,
    verified: false,
    trustScore: 80
  }, {
    id: 'g4',
    lat: 26.2350,
    lng: 78.2250,
    name: 'Dada Maharaj Ashram',
    needed: 'Bulk Rice & Dal',
    urgency: 'High',
    capacity: 1000,
    verified: true,
    trustScore: 99
  }, {
    id: 'g5',
    lat: 26.2500,
    lng: 78.1750,
    name: 'Vaibhav Foundation India',
    needed: 'Canned Goods',
    urgency: 'Medium',
    capacity: 300,
    verified: false,
    trustScore: 85
  }, {
    id: 'g6',
    lat: 26.2100,
    lng: 78.1950,
    name: 'Youthpray Foundation',
    needed: 'Fresh Produce',
    urgency: 'Low',
    capacity: 100,
    verified: true,
    trustScore: 92
  }];
  useEffect(() => {
    if (activeTab === 'nearby_ngos') {
      const ranked = rankNGOs(mockNgos, donorLocation, 0); // using 0 for generic recommendation
      setRecommendedNgos(ranked);
    }
  }, [activeTab, donorLocation]);
  const handleLocateDonor = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setDonorLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      }, () => {
        alert("Couldn't fetch location. Using default.");
      });
    }
  };
  const ngoMarkers = recommendedNgos.map(ngo => ({
    id: ngo.id,
    lat: ngo.lat,
    lng: ngo.lng,
    title: ngo.name,
    subtitle: `Needed: ${ngo.needed} • ${ngo.distance} km away`,
    isUrgent: ngo.urgency === 'High',
    popupContent: <button className="w-full bg-primary-500 text-white py-1 rounded text-xs font-bold mt-2 hover:bg-primary-600 transition-colors" onClick={() => {
      setSelectedNgo(ngo);
      setActiveTab('create');
    }}>{t("donor_dashboard.text1")}</button>
  }));
  return <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold dark:text-white">{t('donor_dashboard.title')}</h2>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 p-1 rounded-xl flex shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'create' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {t('donor_dashboard.tab_create')}
          </button>
          <button onClick={() => setActiveTab('my_donations')} className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'my_donations' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {t('donor_dashboard.tab_my_donations')}
          </button>
          <button onClick={() => setActiveTab('nearby_ngos')} className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'nearby_ngos' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {t('donor_dashboard.tab_nearby')}
          </button>
        </div>
      </div>
      
      {activeTab === 'create' && <div className="max-w-4xl mx-auto">
          {step === 1 && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 dark:text-white">
                <Camera className="text-primary-500" /> {t('donor_dashboard.upload_image')}
              </h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer relative">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {formData.image ? <img src={formData.image} alt="Preview" className="mx-auto max-h-64 rounded-lg" /> : <div className="text-gray-500 dark:text-gray-400">
                    <p className="mb-2">{t('donor_dashboard.click_drag')}</p>
                    <p className="text-sm">{t('donor_dashboard.ai_analyze')}</p>
                  </div>}
              </div>
              <button onClick={analyzeFreshness} disabled={isAnalyzing || !formData.image} className="mt-6 w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                {isAnalyzing ? <span className="animate-pulse">{t("donor_dashboard.text2")}</span> : <><Sparkles size={18} />{t("donor_dashboard.text3")}</>}
              </button>
              <button onClick={() => setStep(2)} className="mt-4 w-full bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">{t("donor_dashboard.text4")}</button>
            </motion.div>}

          {step === 2 && <motion.form initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} onSubmit={submitDonation} className="glass p-8 rounded-3xl space-y-6">
              
              {selectedNgo && <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">{t("donor_dashboard.text5")}</p>
                    <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">{selectedNgo.name}</h4>
                  </div>
                  <button type="button" onClick={() => setSelectedNgo(null)} className="text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-lg font-semibold">{t("donor_dashboard.text6")}</button>
                </div>}

              <h3 className="text-xl font-semibold dark:text-white">{t('donor_dashboard.details_title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('donor_dashboard.food_type')}</label>
                  <input type="text" required value={formData.foodType} onChange={e => setFormData({
              ...formData,
              foodType: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder={t('donor_dashboard.food_type_ph')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('donor_dashboard.quantity')}</label>
                  <div className="flex gap-2">
                    <input type="number" required value={formData.quantity} onChange={e => setFormData({
                ...formData,
                quantity: e.target.value
              })} className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="10" />
                    <select value={formData.unit} onChange={e => setFormData({
                ...formData,
                unit: e.target.value
              })} className="px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-white">
                      <option value="kg">{t("donor_dashboard.text7")}</option>
                      <option value="pieces">{t("donor_dashboard.text8")}</option>
                      <option value="packets">{t("donor_dashboard.text9")}</option>
                      <option value="servings">{t("donor_dashboard.text10")}</option>
                      <option value="liters">{t("donor_dashboard.text11")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('donor_dashboard.prep_time')}</label>
                  <input type="datetime-local" required onChange={e => setFormData({
              ...formData,
              prepTime: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('donor_dashboard.expiry_time')}</label>
                  <input type="datetime-local" required onChange={e => setFormData({
              ...formData,
              expiryTime: e.target.value
            })} className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('donor_dashboard.pickup_location')}</label>
                <div className="mb-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex items-start gap-2 border border-gray-200 dark:border-gray-700">
                  <MapPin className="text-primary-500 shrink-0 mt-0.5" size={16} />
                  <span>{formData.address ? formData.address : t('donor_dashboard.select_location')}</span>
                </div>
                <MapComponent onLocationSelect={handleLocation} />
              </div>

              {aiResult && <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                        <Sparkles className="text-indigo-500" size={18} />{t("donor_dashboard.text12")}</h4>
                      <p className="text-sm text-indigo-700/80 dark:text-indigo-400/80 mt-1">{t("donor_dashboard.text13")}</p>
                    </div>
                    <FreshnessBadge foodBrainData={aiResult} showDetails={true} />
                  </div>
                </div>}

              <button type="submit" disabled={loading || !formData.lat} className="w-full bg-primary-500 flex items-center justify-center gap-2 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3 rounded-xl font-semibold transition-colors">
                {loading ? t('donor_dashboard.analyzing') : <><Send size={20} /> {t('donor_dashboard.submit_rescue')}</>}
              </button>
            </motion.form>}

          {step === 3 && <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="glass p-8 rounded-3xl text-center">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('donor_dashboard.success_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">{t('donor_dashboard.success_desc')}</p>
              
              {aiResult && <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{aiResult.peopleFed}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('donor_dashboard.people_fed')}</div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{aiResult.freshnessScore}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('donor_dashboard.freshness')}</div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{aiResult.safetyScore}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('donor_dashboard.safety_rating')}</div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{aiResult.co2Saved.toFixed(1)}{t("donor_dashboard.text14")}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('donor_dashboard.co2_saved')}</div>
                  </div>
                </div>}
              
              <div className="flex justify-center gap-4">
                <button onClick={() => {
            setStep(1);
            setFormData({
              ...formData,
              image: ''
            });
            setAiResult(null);
          }} className="px-6 py-2 border-2 border-primary-500 text-primary-500 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  {t('donor_dashboard.make_another')}
                </button>
                <button onClick={() => setActiveTab('my_donations')} className="px-6 py-2 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                  {t('donor_dashboard.view_my_donations')}
                </button>
              </div>
            </motion.div>}
        </div>}

      {activeTab === 'my_donations' && <div className="space-y-6">
          {myDonations.length === 0 ? <div className="glass p-12 text-center rounded-3xl">
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t('donor_dashboard.no_donations')}</p>
              <button onClick={() => setActiveTab('create')} className="mt-4 text-primary-500 font-medium hover:underline">
                {t('donor_dashboard.start_rescuing')}
              </button>
            </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myDonations.map((donation, index) => <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -5,
          scale: 1.02
        }} key={donation._id} className="glass-card rounded-3xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-primary-500/10 transition-shadow">
                  <div className="relative">
                    {donation.image ? <img src={donation.image} alt={donation.foodType} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">{t('donor_dashboard.no_image')}</div>}
                    {/* Status Badge */}
                    <motion.div whileHover={{
              scale: 1.05
            }} className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-md capitalize cursor-default">
                      {donation.status === 'PickedUp' ? 'On the Way 🚚' : donation.status === 'Completed' ? 'Delivered ✅' : t(`status_${donation.status}`, {
                defaultValue: donation.status.replace('_', ' ')
              })}
                    </motion.div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold dark:text-white">{donation.foodType}</h3>
                      {donation.foodBrainData && <FreshnessBadge foodBrainData={donation.foodBrainData} />}
                    </div>
                    
                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="mr-2 text-primary-500" />
                        <span>{t('donor_dashboard.expires')} {new Date(donation.expiryTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                      </div>
                      {(donation.status === 'accepted' || donation.status === 'picked_up') && <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 p-2 rounded-lg mt-2">
                          <CheckCircle size={16} className="mr-2" />
                          <span>{t('donor_dashboard.rescued_waiting')}</span>
                        </div>}
                    </div>

                    <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => openChat(donation._id)} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800">
                      <MessageCircle size={20} /> {t('volunteer_dashboard.open_chat')}
                    </motion.button>
                    
                    {donation.status === 'PickedUp' && <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setTrackingDonation(donation)} className="w-full mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                        <Navigation size={20} />{t("donor_dashboard.text15")}</motion.button>}
                  </div>
                </motion.div>)}
            </div>}
        </div>}

      {activeTab === 'nearby_ngos' && <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 glass p-4 sm:p-6 rounded-3xl flex flex-col h-[400px] lg:h-[700px]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">{t('donor_dashboard.nearby_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{t('donor_dashboard.nearby_desc')}</p>
              </div>
              <button onClick={handleLocateDonor} className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                <MapPin size={16} />{t("donor_dashboard.text16")}</button>
            </div>
            <div className="flex-grow rounded-2xl overflow-hidden relative">
              <RadarMapComponent markers={ngoMarkers} donorLocation={donorLocation} center={[donorLocation.lat, donorLocation.lng]} zoom={11} className="h-full w-full absolute inset-0" />
            </div>
          </div>

          <div className="lg:w-96 glass p-4 sm:p-6 rounded-3xl h-[400px] lg:h-[700px] flex flex-col overflow-hidden">
            <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <Star className="text-accent-500" />{t("donor_dashboard.text17")}</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {recommendedNgos.map((ngo, idx) => <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: idx * 0.1
          }} key={ngo.id} className={`p-4 rounded-2xl border ${idx === 0 ? 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-transparent border-primary-200 dark:border-primary-800 shadow-md' : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'}`}>
                  {idx === 0 && <div className="flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 mb-2 bg-primary-100 dark:bg-primary-900/40 w-max px-2 py-1 rounded-full uppercase tracking-wider">
                      <Sparkles size={12} />{t("donor_dashboard.text18")}</div>}
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{ngo.name}</h4>
                      {ngo.verified && <VerifiedBadge />}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${ngo.urgency === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ngo.urgency === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {ngo.urgency}{t("donor_dashboard.text19")}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.round(ngo.trustScore / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"} />)}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({ngo.trustScore}{t("donor_dashboard.text20")}</span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-1">{t("donor_dashboard.text21")}{ngo.needed}</p>
                  
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Navigation size={14} className="text-blue-500" />
                      {ngo.distance}{t("donor_dashboard.text22")}</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Package size={14} className="text-accent-500" />
                      {ngo.capacity}{t("donor_dashboard.text23")}</div>
                  </div>
                  
                  <button onClick={() => {
              setSelectedNgo(ngo);
              setActiveTab('create');
            }} className={`w-full mt-3 py-2 rounded-xl text-sm font-bold transition-colors ${idx === 0 ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}>{t("donor_dashboard.text24")}</button>
                </motion.div>)}
            </div>
          </div>
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
export default DonorDashboard;