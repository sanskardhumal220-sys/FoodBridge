import { motion } from 'framer-motion';
import { Truck, Navigation, CheckCircle, Package } from 'lucide-react';

const LiveTracking = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/2 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
        >
          <Navigation className="w-12 h-12 text-blue-500" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          Live Tracking
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Monitor your food donations in real-time. From pickup to delivery, stay informed about the journey of your contribution.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl max-w-2xl mx-auto"
        >
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-blue-500 text-white rounded-full">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Donation Listed</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Waiting for volunteer acceptance.</p>
              </div>
            </div>
            
            <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-800 ml-6 -my-6" />

            <div className="flex items-center gap-4 text-left opacity-50">
              <div className="p-3 bg-gray-200 dark:bg-gray-800 text-gray-500 rounded-full">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">In Transit</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Volunteer is on the way.</p>
              </div>
            </div>
            
            <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-800 ml-6 -my-6" />

            <div className="flex items-center gap-4 text-left opacity-50">
              <div className="p-3 bg-gray-200 dark:bg-gray-800 text-gray-500 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Delivered</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Food safely reached the NGO.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Log in to your dashboard to track active donations.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveTracking;
