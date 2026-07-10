import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, Mail, Bug, MessageSquare, Book, 
  Phone, MapPin, Clock, AlertOctagon,
  User, Heart, Truck, Building, Shield, ShieldCheck, Download
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { triggerNotification } from '../components/ToastProvider';

const Support = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const HELP_CATEGORIES = [
    { icon: <User />, title: 'Account Issues' },
    { icon: <Heart />, title: 'Donation Problems' },
    { icon: <Truck />, title: 'Volunteer Help' },
    { icon: <Building />, title: 'NGO Help' },
    { icon: <Bug />, title: 'Technical Issues' },
    { icon: <Shield />, title: 'Privacy & Security' },
    { icon: <ShieldCheck />, title: 'Food Safety' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6 text-primary-500">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help you 24/7. Find answers fast or get in touch with our support team.
          </p>
        </motion.div>

        {/* Main Support Hub Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          <HubCard to="/faq" icon={<HelpCircle />} title="FAQ" desc="Find common answers" color="text-blue-500" bg="bg-blue-100 dark:bg-blue-900/30" />
          <HubCard to="/contact" icon={<Mail />} title="Contact Us" desc="Reach our team" color="text-green-500" bg="bg-green-100 dark:bg-green-900/30" />
          <HubCard to="/report-issue" icon={<Bug />} title="Report Issue" desc="Tell us about a bug" color="text-red-500" bg="bg-red-100 dark:bg-red-900/30" />
          <HubCard to="/feedback" icon={<MessageSquare />} title="Send Feedback" desc="Share your thoughts" color="text-orange-500" bg="bg-orange-100 dark:bg-orange-900/30" />
          <HubCard to="/faq" icon={<Book />} title="Help Center" desc="Read our guides" color="text-purple-500" bg="bg-purple-100 dark:bg-purple-900/30" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Live Chat Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <MessageSquare size={40} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Chat with Support</h3>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Average response time: <span className="font-semibold text-gray-900 dark:text-white">Under 2 minutes</span></p>
              <button onClick={() => triggerNotification('Connecting to a live agent...')} className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-md">
                Start Live Chat
              </button>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <InfoRow icon={<Mail className="w-5 h-5" />} text="support@foodbridge.com" />
              <InfoRow icon={<Phone className="w-5 h-5" />} text="+1 (555) 123-4567" />
              <InfoRow icon={<MapPin className="w-5 h-5" />} text="123 Impact Way, SC 90210" />
              <InfoRow icon={<Clock className="w-5 h-5" />} text="Mon - Fri, 9AM - 6PM" />
              <InfoRow icon={<AlertOctagon className="w-5 h-5 text-red-500" />} text="Emergency: 911" isDanger />
            </div>
          </motion.div>

        </div>

        {/* Categories & Actions */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Browse Help Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {HELP_CATEGORIES.map((cat, idx) => (
                <Link key={idx} to="/faq" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary-400 transition-colors text-center group">
                  <div className="text-primary-500 group-hover:scale-110 transition-transform mb-3">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton to="/faq" icon={<HelpCircle />} text="Open FAQ" />
              <ActionButton to="/contact" icon={<Mail />} text="Contact Support" />
              <ActionButton to="/report-issue" icon={<Bug />} text="Report Bug" />
              <ActionButton to="/feedback" icon={<MessageSquare />} text="Send Feedback" />
              <button onClick={() => triggerNotification('User Guide downloaded successfully!')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 hover:bg-primary-100 transition-colors font-medium text-sm text-left">
                <Download className="w-5 h-5 shrink-0" /> Download User Guide
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 text-center">Follow Us</p>
              <div className="flex justify-center gap-3">
                <SocialIcon Icon={FaFacebook} color="text-[#1877F2]" />
                <SocialIcon Icon={FaInstagram} color="text-[#E4405F]" />
                <SocialIcon Icon={FaLinkedin} color="text-[#0A66C2]" />
                <SocialIcon Icon={FaXTwitter} color="text-gray-900 dark:text-white" />
                <SocialIcon Icon={FaGithub} color="text-gray-900 dark:text-white" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

const HubCard = ({ to, icon, title, desc, color, bg }) => (
  <Link to={to} className="glass p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:-translate-y-1 text-center group">
    <div className={`w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
  </Link>
);

const InfoRow = ({ icon, text, isDanger }) => (
  <div className={`flex items-center gap-4 ${isDanger ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
    <div className={`shrink-0 ${isDanger ? '' : 'text-primary-500'}`}>{icon}</div>
    <span className={`font-medium ${isDanger ? 'font-bold' : ''}`}>{text}</span>
  </div>
);

const ActionButton = ({ to, icon, text }) => (
  <Link to={to} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-colors font-medium text-sm text-gray-700 dark:text-gray-300">
    <div className="text-gray-400">{icon}</div> {text}
  </Link>
);

const SocialIcon = ({ Icon, color }) => (
  <a href="#" className={`p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform ${color}`}>
    <Icon className="w-4 h-4" />
  </a>
);

export default Support;
