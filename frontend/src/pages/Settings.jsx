import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, Shield, Bell, Lock, Globe, Monitor, Moon, Sun, Trash2, AlertTriangle, Key, LogOut, Smartphone, CheckCircle2, ChevronRight } from 'lucide-react';
import { triggerNotification } from '../components/ToastProvider';
const Settings = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // User State
  const [user, setUser] = useState({
    name: 'Loading...',
    email: '...',
    phone: 'Not provided',
    role: '...',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'
  });

  // Toggles State
  const defaultToggles = {
    notifDonation: true,
    notifVolunteer: true,
    notifNGO: true,
    notifChat: true,
    notifEmail: true,
    notifPush: false,
    notifPromo: false,
    privHidePhone: false,
    privHideAddress: true,
    privLocation: true,
    privOnlineStatus: true
  };
  const [toggles, setToggles] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : defaultToggles;
  });
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser({
        name: userInfo.name || 'User',
        email: userInfo.email || '',
        phone: userInfo.phone || 'Not provided',
        role: userInfo.role || 'User',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.name || 'User'}`
      });
    }
  }, []);
  const handleToggle = key => {
    const newToggles = {
      ...toggles,
      [key]: !toggles[key]
    };
    setToggles(newToggles);
    localStorage.setItem('userSettings', JSON.stringify(newToggles));
  };
  const changeLanguage = e => {
    i18n.changeLanguage(e.target.value);
  };
  const applyTheme = newTheme => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{t('settings.title', 'Settings')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('settings.subtitle', 'Manage your account, preferences, privacy, and notifications.')}</p>
        </motion.div>

        <div className="space-y-8">
          
          {/* Account Settings */}
          <SettingsSection title={t("settings.attr1")} icon={<User className="text-primary-500" />}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden shrink-0">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow space-y-3 w-full">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t("settings.text2")}</p>
                    <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                      <User size={16} className="text-gray-400" /> {user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t("settings.text3")}</p>
                    <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" /> {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t("settings.text4")}</p>
                    <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" /> {user.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t("settings.text5")}</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
                      <Shield size={14} /> {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 border-t border-gray-100 dark:border-gray-800/50 pt-6">
              <button onClick={() => triggerNotification('Edit Profile coming soon!')} className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity">{t("settings.text6")}</button>
              <button onClick={() => triggerNotification('Change Password coming soon!')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{t("settings.text7")}</button>
            </div>
          </SettingsSection>

          {/* Appearance & Language */}
          <div className="grid md:grid-cols-2 gap-8">
            <SettingsSection title={t("settings.attr8")} icon={<Monitor className="text-blue-500" />}>
              <div className="space-y-4">
                <ThemeOption active={theme === 'light'} onClick={() => applyTheme('light')} icon={<Sun size={20} />} label="Light Mode" />
                <ThemeOption active={theme === 'dark'} onClick={() => applyTheme('dark')} icon={<Moon size={20} />} label="Dark Mode" />
                <ThemeOption active={theme === 'system'} onClick={() => applyTheme('system')} icon={<Monitor size={20} />} label="System Default" />
              </div>
            </SettingsSection>

            <SettingsSection title={t("settings.attr9")} icon={<Globe className="text-green-500" />}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("settings.text10")}</p>
              <div className="relative">
                <select onChange={changeLanguage} defaultValue={i18n.language || 'en'} className="w-full appearance-none px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow cursor-pointer">
                  <option value="en">{t("settings.text11")}</option>
                  <option value="hi">हिंदी 🇮🇳</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={20} />
              </div>
            </SettingsSection>
          </div>

          {/* Notifications */}
          <SettingsSection title={t("settings.attr12")} icon={<Bell className="text-accent-500" />}>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <ToggleRow label="Donation Updates" isOn={toggles.notifDonation} onToggle={() => handleToggle('notifDonation')} />
              <ToggleRow label="Volunteer Updates" isOn={toggles.notifVolunteer} onToggle={() => handleToggle('notifVolunteer')} />
              <ToggleRow label="NGO Updates" isOn={toggles.notifNGO} onToggle={() => handleToggle('notifNGO')} />
              <ToggleRow label="Chat Notifications" isOn={toggles.notifChat} onToggle={() => handleToggle('notifChat')} />
              <ToggleRow label="Email Notifications" isOn={toggles.notifEmail} onToggle={() => handleToggle('notifEmail')} />
              <ToggleRow label="Push Notifications" isOn={toggles.notifPush} onToggle={() => handleToggle('notifPush')} />
              <ToggleRow label="Promotional Messages" isOn={toggles.notifPromo} onToggle={() => handleToggle('notifPromo')} />
            </div>
          </SettingsSection>

          {/* Privacy */}
          <SettingsSection title={t("settings.attr13")} icon={<Shield className="text-indigo-500" />}>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <ToggleRow label="Hide Phone Number" isOn={toggles.privHidePhone} onToggle={() => handleToggle('privHidePhone')} />
              <ToggleRow label="Hide Exact Address" isOn={toggles.privHideAddress} onToggle={() => handleToggle('privHideAddress')} />
              <ToggleRow label="Allow Location Access" isOn={toggles.privLocation} onToggle={() => handleToggle('privLocation')} />
              <ToggleRow label="Show Online Status" isOn={toggles.privOnlineStatus} onToggle={() => handleToggle('privOnlineStatus')} />
            </div>
          </SettingsSection>

          {/* Security */}
          <SettingsSection title={t("settings.attr14")} icon={<Lock className="text-gray-700 dark:text-gray-300" />}>
            <div className="space-y-4">
              <button onClick={() => triggerNotification('Change Password flow starting...')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                  <Key size={20} className="text-gray-400" />{t("settings.text15")}</div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button onClick={() => triggerNotification('2FA settings coming soon!')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                  <Smartphone size={20} className="text-gray-400" />{t("settings.text16")}<span className="text-[10px] uppercase tracking-wider bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full ml-2 group-hover:animate-pulse">{t("settings.text17")}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
                <button onClick={() => triggerNotification('Active Sessions fetched!')} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex justify-center items-center gap-2">
                  <Monitor size={18} />{t("settings.text18")}</button>
                <button onClick={() => triggerNotification('Logged out from all devices!')} className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex justify-center items-center gap-2">
                  <LogOut size={18} />{t("settings.text19")}</button>
              </div>
            </div>
          </SettingsSection>

          {/* Danger Zone */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="glass border border-red-200 dark:border-red-900/50 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
            <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2 flex items-center gap-2">
              <AlertTriangle />{t("settings.text20")}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t("settings.text21")}</p>
            <button onClick={() => setShowDeleteModal(true)} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20">{t("settings.text22")}</button>
          </motion.div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} className="glass max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("settings.text23")}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{t("settings.text24")}</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{t("settings.text25")}</button>
                <button onClick={() => {
              setShowDeleteModal(false);
              triggerNotification('Account deletion request submitted!');
            }} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20">{t("settings.text26")}</button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

    </div>;
};
const SettingsSection = ({
  title,
  icon,
  children
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} animate={{
  opacity: 1,
  y: 0
}} className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">{icon}</div>
      {title}
    </h3>
    {children}
  </motion.div>;
const ThemeOption = ({
  active,
  onClick,
  icon,
  label
}) => <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${active ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300'}`}>
    <div className="flex items-center gap-3 font-medium">
      {icon} {label}
    </div>
    {active && <CheckCircle2 size={20} className="text-primary-500" />}
  </button>;
const ToggleRow = ({
  label,
  isOn,
  onToggle
}) => <div className="flex items-center justify-between group">
    <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
    <button onClick={onToggle} className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${isOn ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
      <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" animate={{
      x: isOn ? 24 : 0
    }} transition={{
      type: "spring",
      stiffness: 500,
      damping: 30
    }} />
    </button>
  </div>;
export default Settings;