import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Donor',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post((import.meta.env.VITE_API_URL || '') + '/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // Navigate to login after successful registration
      navigate('/login');
    } catch (error) {
      if (error.message === 'Network Error') {
        alert('Registration failed: Network Error. Cannot connect to the backend server. Please ensure the backend and tunnel are running.');
      } else {
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    }
  };


  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background blobs for Auth pages */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md glass-card p-6 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-accent-400" />
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 dark:text-white">{t('register.title')}</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium">Join us in bridging food and building hope.</p>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('register.name')}</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              placeholder={t('register.name_ph')}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('register.email')}</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              placeholder="you@example.com"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('register.password')}</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              placeholder="••••••••"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('register.role')}</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
            >
              <option value="Donor">{t('register.donor_role')}</option>
              <option value="NGO">{t('register.ngo_role')}</option>
              <option value="Volunteer">{t('register.volunteer_role')}</option>
            </select>
          </motion.div>
          


          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary-500/30 mt-6"
          >
            {t('register.submit')}
          </motion.button>
        </form>
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400 font-medium">
          {t('register.have_account')} <Link to="/login" className="text-primary-500 hover:text-primary-600 hover:underline font-bold transition-colors">{t('register.login_here')}</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
