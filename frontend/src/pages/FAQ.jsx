import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';

const faqData = [
  {
    q: "What is FoodBridge?",
    a: "FoodBridge is a technology-driven platform that connects surplus food from restaurants, events, and individuals with NGOs and communities facing food insecurity."
  },
  {
    q: "How does food donation work?",
    a: "Donors upload details of surplus food. Our FoodBrain AI verifies safety and freshness. Nearby NGOs or volunteers are alerted and can claim the food for pickup and distribution."
  },
  {
    q: "Is FoodBridge free?",
    a: "Yes! FoodBridge is completely free for donors, NGOs, and volunteers. Our mission is to eliminate food waste and hunger without financial barriers."
  },
  {
    q: "How are NGOs verified?",
    a: "NGOs undergo a verification process during registration, which includes checking their official registration documents and community impact to ensure safety and reliability."
  },
  {
    q: "How does AI FoodBrain work?",
    a: "FoodBrain AI analyzes uploaded images, food category, preparation time, and location data to estimate freshness and safety before an NGO can claim the food."
  },
  {
    q: "How can I become a volunteer?",
    a: "You can register as a volunteer by selecting the 'Volunteer' role during sign-up. You'll need to provide basic contact info and agree to our safety guidelines."
  }
];

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <MessageCircleQuestion className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about FoodBridge.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {faqData.map((item, idx) => {
            const isExpanded = expandedId === idx;
            return (
              <motion.div 
                key={idx} 
                layout 
                className={`glass rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isExpanded ? 'border-primary-400 dark:border-primary-600 shadow-md bg-white/80 dark:bg-gray-900/80' : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:border-primary-300'
                }`}
              >
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : idx)} 
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">{item.q}</span>
                  <div className={`p-1 rounded-full transition-colors ${
                    isExpanded ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' : 'text-gray-400'
                  }`}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/50 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;