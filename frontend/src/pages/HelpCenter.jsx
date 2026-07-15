import { motion } from 'framer-motion';
import { Mail, Phone, LifeBuoy, AlertCircle, Building2, Users } from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    { icon: <AlertCircle />, title: "Account Issues", desc: "Login problems, password resets, and profile management." },
    { icon: <LifeBuoy />, title: "Donation Problems", desc: "Cancellation, tracking issues, or volunteer delays." },
    { icon: <Users />, title: "Volunteer Support", desc: "Guidelines, app usage, and safety protocols." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/2 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <LifeBuoy className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            How can we help you today? Browse categories or contact our support team directly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex flex-col items-center text-center hover:border-primary-400 transition-colors"
          >
            <div className="p-4 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <a href="mailto:dhumalhema4@gmail.com" className="text-primary-500 hover:underline">
              dhumalhema4@gmail.com
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex flex-col items-center text-center hover:border-primary-400 transition-colors"
          >
            <div className="p-4 bg-accent-100 dark:bg-accent-900/30 text-accent-500 rounded-full mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
            <a href="tel:+917489912494" className="text-accent-500 hover:underline">
              +91 74899 12494
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Common Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="glass p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:shadow-lg transition-shadow">
                <div className="mb-4 text-gray-700 dark:text-gray-300">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cat.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-100 dark:bg-gray-800 px-6 py-3 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
            🚀 More features coming soon.
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HelpCenter;
