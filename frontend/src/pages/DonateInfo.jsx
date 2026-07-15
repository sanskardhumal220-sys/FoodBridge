import { motion } from 'framer-motion';
import { Heart, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonateInfo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6"
        >
          <Heart className="w-12 h-12 text-primary-500" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          Start Donating Today
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Your surplus food can make a world of difference. Join FoodBridge and help us connect excess food with those who need it most.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {[
            { icon: <ShieldCheck />, title: "Safe & Secure", desc: "Our AI ensures food quality and matches you safely." },
            { icon: <Clock />, title: "Quick Pickup", desc: "Volunteers arrive swiftly to collect your donation." },
            { icon: <MapPin />, title: "Local Impact", desc: "Directly help NGOs and communities in your area." }
          ].map((item, idx) => (
            <div key={idx} className="glass p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex flex-col items-center text-center">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-500 rounded-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-primary-500/25 hover:-translate-y-1"
          >
            Create Donor Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-primary-500 hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DonateInfo;
