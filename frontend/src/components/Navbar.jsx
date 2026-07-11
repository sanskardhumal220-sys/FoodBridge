import { Link, useNavigate } from 'react-router-dom';
import { Utensils, LogOut, LayoutDashboard, Globe, Settings as SettingsIcon, BarChart2, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
          <div className="flex space-x-1 sm:space-x-4 items-center shrink-0">
            
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
