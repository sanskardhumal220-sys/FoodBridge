import { Link, useNavigate } from 'react-router-dom';
import { Utensils, LogOut, LayoutDashboard, Globe, Settings as SettingsIcon, BarChart2, Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Check initial dark mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

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
          <Link to="/" className="flex items-center space-x-1 sm:space-x-3 group min-w-[32px] shrink-0">
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              src="/logo.png" 
              alt="FoodBridge Logo" 
              className="h-8 sm:h-10 w-auto rounded-lg object-cover shadow-sm group-hover:shadow-primary-500/50 transition-shadow" 
            />
            <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-gradient hidden lg:block">
              FoodBridge
            </span>
          </Link>
          <div className="hidden md:flex space-x-1 sm:space-x-4 items-center shrink-0">
            
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: isDarkMode ? -15 : 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-1 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {isDarkMode ? <Sun size={14} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={14} className="sm:w-[18px] sm:h-[18px]" />}
            </motion.button>            
            
            {/* Language Switcher */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-1 sm:px-2 py-0.5 sm:py-1 mr-0 sm:mr-2 border border-gray-200 dark:border-gray-700 hover:border-primary-300 transition-colors"
            >
              <Globe size={12} className="mr-0.5 sm:mr-2 text-primary-500 sm:w-[16px] sm:h-[16px]" />
              <select 
                onChange={changeLanguage} 
                defaultValue={i18n.language || 'en'}
                className="bg-transparent text-[10px] sm:text-sm font-medium outline-none cursor-pointer w-[45px] sm:w-auto"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="mr">MR</option>
                <option value="gu">GU</option>
                <option value="bn">BN</option>
                <option value="ta">TA</option>
              </select>
            </motion.div>

            {user ? (
              <>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden lg:inline-block mr-2 font-medium">
                  {t('navbar.welcome')}, <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
                </span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-1 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-base font-medium transition-all flex items-center gap-1 sm:gap-2">
                    <LayoutDashboard size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden sm:inline">{t('navbar.dashboard')}</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/settings" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-1 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-base font-medium transition-all flex items-center gap-1 sm:gap-2">
                    <SettingsIcon size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden sm:inline">Settings</span>
                  </Link>
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout} 
                  className="text-red-500 hover:text-red-600 px-1 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-base font-medium transition-all flex items-center gap-1 sm:gap-2"
                >
                  <LogOut size={14} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">{t('navbar.logout')}</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 px-1 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-base font-medium transition-colors whitespace-nowrap">
                    {t('navbar.login')}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 transition-all duration-300"></span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="glow-border bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-2 sm:px-5 py-1 sm:py-2.5 rounded-full text-xs sm:text-base font-medium transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center whitespace-nowrap">
                    {t('navbar.join')}
                  </Link>
                </motion.div>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: isDarkMode ? -15 : 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button> 
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Language</span>
              <select 
                onChange={changeLanguage} 
                defaultValue={i18n.language || 'en'}
                className="bg-gray-100 dark:bg-gray-800 text-sm font-medium outline-none cursor-pointer rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  {t('navbar.welcome')}, <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
                </span>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  {t('navbar.dashboard')}
                </Link>
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2">
                  <SettingsIcon size={18} />
                  Settings
                </Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-red-500 hover:text-red-600 px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2 text-left">
                  <LogOut size={18} />
                  {t('navbar.logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl font-medium transition-colors">
                  {t('navbar.login')}
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-primary-500/30">
                  {t('navbar.join')}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
