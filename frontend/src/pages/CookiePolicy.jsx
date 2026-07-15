import { motion } from 'framer-motion';
import { Cookie, ShieldCheck, Settings, EyeOff } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-6">
            <Cookie className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We use cookies to improve your experience on FoodBridge. This policy explains what cookies are and how we use them.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {[
            { 
              icon: <ShieldCheck />, 
              title: "Essential Cookies", 
              desc: "These cookies are necessary for the platform to function properly, such as keeping you logged in and securing your session. They cannot be disabled." 
            },
            { 
              icon: <Settings />, 
              title: "Functional Cookies", 
              desc: "These help us remember your preferences, like your language selection or whether you prefer light or dark mode." 
            },
            { 
              icon: <EyeOff />, 
              title: "Analytics Cookies", 
              desc: "We use these to understand how users interact with our platform, helping us improve features and fix bugs. Data is anonymized." 
            }
          ].map((item, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex gap-6 items-start">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 rounded-2xl shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            You can manage your cookie preferences in your browser settings at any time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
