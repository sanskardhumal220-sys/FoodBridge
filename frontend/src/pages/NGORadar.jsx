import { motion } from 'framer-motion';
import { Radar, Users, Map, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const NGORadar = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6"
        >
          <Radar className="w-12 h-12 text-emerald-500" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          NGO Radar
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover and connect with verified non-governmental organizations in your region. See their impact, current needs, and help bridge the gap in food distribution.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {[
            { icon: <Map />, title: "Interactive Map", desc: "Locate active NGOs in your city visually." },
            { icon: <Users />, title: "Community Reach", desc: "Understand the demographics they support." },
            { icon: <Globe />, title: "Global Network", desc: "Part of a wider effort to combat hunger." }
          ].map((item, idx) => (
            <div key={idx} className="glass p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex flex-col items-center text-center">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-2xl mb-4">
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
          <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want to register your NGO?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Join FoodBridge to receive surplus food donations directly from local businesses and individuals.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
            >
              Register as NGO
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NGORadar;
