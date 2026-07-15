import { Link, useNavigate } from 'react-router-dom';
import { Utensils, LogOut, LayoutDashboard, Globe, Settings as SettingsIcon, BarChart2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkUser = () => {
      const userInfo = localStorage.getItem('userInfo');
      setUser(userInfo ? JSON.parse(userInfo) : null);
    };
    
    checkUser();
    window.addEventListener('storage', checkUser);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-lg dark:shadow-none py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              src="/logo.png" 
              alt="FoodBridge Logo" 
              className="h-10 w-10 rounded-full object-contain p-1 shadow-sm group-hover:shadow-primary-500/50 transition-shadow bg-white" 
            />
            <span className="font-extrabold text-2xl tracking-tight text-gradient">
              FoodBridge
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {/* Language Switcher */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-2 py-1 mr-2 border border-gray-200 dark:border-gray-700 hover:border-primary-300 transition-colors"
            >
              <Globe size={16} className="mr-2 text-primary-500" />
              <select 
                value={i18n.resolvedLanguage || 'en'}
                onChange={changeLanguage} 
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </motion.div>

            {user ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 font-medium">
                  {t('navbar.welcome')}, <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
                </span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    {t('navbar.dashboard')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/settings" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2">
                    <SettingsIcon size={18} />
                    Settings
                  </Link>
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout} 
                  className="text-red-500 hover:text-red-600 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2"
                >
                  <LogOut size={18} />
                  {t('navbar.logout')}
                </motion.button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 px-3 py-2 rounded-md font-medium transition-colors">
                    {t('navbar.login')}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all duration-300"></span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="glow-border bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center">
                    {t('navbar.join')}
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 p-2 rounded-md"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div className="px-4 py-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Globe size={18} className="mr-2 text-primary-500" />
                <span className="font-medium text-sm">Language</span>
              </div>
              <select 
                value={i18n.resolvedLanguage || 'en'}
                onChange={changeLanguage} 
                className="bg-transparent text-sm font-bold outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>

            {user ? (
              <>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                  {t('navbar.welcome')}, <span className="text-gray-800 dark:text-gray-200 font-bold">{user.name}</span>
                </div>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3">
                  <LayoutDashboard size={20} className="text-primary-500" />
                  {t('navbar.dashboard')}
                </Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/settings" className="text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3">
                  <SettingsIcon size={20} className="text-primary-500" />
                  Settings
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3"
                >
                  <LogOut size={20} />
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="w-full text-center border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3 rounded-xl font-bold transition-colors">
                  {t('navbar.login')}
                </Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/register" className="w-full text-center bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30">
                  {t('navbar.join')}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
