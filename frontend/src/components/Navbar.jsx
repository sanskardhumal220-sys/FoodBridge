import { Link, useNavigate } from 'react-router-dom';
import { Utensils, LogOut, LayoutDashboard, Globe, Settings as SettingsIcon, BarChart2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkUser = () => {
      const userInfo = localStorage.getItem('userInfo');
      setUser(userInfo ? JSON.parse(userInfo) : null);
    };
    
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
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
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="FoodBridge Logo" className="h-10 w-auto rounded-lg object-cover" />
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
              FoodBridge
            </span>
          </Link>
          <div className="flex space-x-4 items-center">
            
            <Link to="/analytics" className="hidden sm:flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors font-medium text-sm">
              <BarChart2 size={18} className="mr-1" />
              Impact
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1 mr-2">
              <Globe size={16} className="mr-2 text-primary-500" />
              <select 
                onChange={changeLanguage} 
                defaultValue={i18n.language || 'en'}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            {user ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block mr-2">
                  {t('navbar.welcome')}, {user.name}
                </span>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  {t('navbar.dashboard')}
                </Link>
                <Link to="/settings" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
                  <SettingsIcon size={18} />
                  Settings
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
                  <LogOut size={18} />
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 px-3 py-2 rounded-md font-medium transition-colors">
                  {t('navbar.login')}
                </Link>
                <Link to="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary-500/30">
                  {t('navbar.join')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
