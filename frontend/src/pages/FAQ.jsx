import { useTranslation } from "react-i18next";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
const FAQ_DATA = [{
  category: 'General',
  questions: [{
    q: 'What is FoodBridge?',
    a: 'FoodBridge is a technology-driven platform that connects surplus food from restaurants, events, and individuals with NGOs and communities facing food insecurity.'
  }, {
    q: 'How does FoodBridge work?',
    a: 'Donors upload details of surplus food. Our FoodBrain AI verifies safety and freshness. Nearby NGOs or volunteers are alerted and can claim the food for pickup and distribution.'
  }, {
    q: 'Is FoodBridge free?',
    a: 'Yes! FoodBridge is completely free for donors, NGOs, and volunteers. Our mission is to eliminate food waste and hunger without financial barriers.'
  }]
}, {
  category: 'Donations',
  questions: [{
    q: 'Who can donate food?',
    a: 'Anyone can donate! We accept donations from individuals, restaurants, banquet halls, hotels, and grocery stores.'
  }, {
    q: 'What type of food can I donate?',
    a: 'We accept cooked meals, fresh produce, dairy, bakery items, and dry goods. Food must be safe for human consumption.'
  }, {
    q: 'Can I donate homemade food?',
    a: 'Yes, homemade food is accepted. Please provide accurate preparation times so our FoodBrain AI can calculate safe consumption windows.'
  }, {
    q: 'Can I cancel a donation?',
    a: 'Yes, you can cancel a donation from your dashboard before it has been claimed or picked up by a volunteer.'
  }]
}, {
  category: 'NGOs',
  questions: [{
    q: 'How do NGOs accept donations?',
    a: 'Verified NGOs can browse available donations on their dashboard or interactive map and click "Claim" to schedule a pickup.'
  }, {
    q: 'How is food verified?',
    a: 'Our FoodBrain AI analyzes uploaded images and metadata (prep time, expiry) to estimate freshness and safety before an NGO can claim it.'
  }]
}, {
  category: 'Volunteers',
  questions: [{
    q: 'How do I become a volunteer?',
    a: 'You can register as a volunteer by selecting the "Volunteer" role during sign-up. You will need to provide basic contact and vehicle information.'
  }, {
    q: 'Is volunteer verification required?',
    a: 'Yes, for the safety of our community, volunteers undergo a brief verification process before they can accept pickup requests.'
  }]
}, {
  category: 'Food Safety',
  questions: [{
    q: 'How does FoodBrain AI calculate freshness?',
    a: 'It analyzes the food category, preparation time, current temperature/location data, and visual cues from the uploaded image to generate a freshness score.'
  }, {
    q: 'How do you ensure food safety?',
    a: 'Along with AI checks, we enforce strict guidelines, educate donors, and empower NGOs to perform final visual and olfactory checks upon pickup.'
  }]
}, {
  category: 'Privacy',
  questions: [{
    q: 'Is my personal information secure?',
    a: 'Absolutely. We use industry-standard encryption and do not sell your personal data. Read our Privacy Policy for more details.'
  }, {
    q: 'How is my location used?',
    a: 'Location data is only used to match you with nearby donations or NGOs and is never shared publicly.'
  }]
}];
const FAQ = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const categories = ['All', ...FAQ_DATA.map(d => d.category)];
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.map(section => {
      // Filter by category
      if (activeCategory !== 'All' && section.category !== activeCategory) {
        return null;
      }

      // Filter by search query
      const filteredQuestions = section.questions.filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filteredQuestions.length === 0) return null;
      return {
        ...section,
        questions: filteredQuestions
      };
    }).filter(Boolean);
  }, [searchQuery, activeCategory]);
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t("f_a_q.text1")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t("f_a_q.text2")}</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="relative mb-10 max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder={t("f_a_q.attr3")} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow dark:text-white shadow-sm" />
        </motion.div>

        {/* Categories */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.2
      }} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => <button key={cat} onClick={() => {
          setActiveCategory(cat);
          setExpandedId(null);
        }} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400'}`}>
              {cat}
            </button>)}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div layout className="space-y-8">
          <AnimatePresence>
            {filteredFAQs.length === 0 ? <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="text-center py-12 text-gray-500 dark:text-gray-400">{t("f_a_q.text4")}</motion.div> : filteredFAQs.map((section, sIdx) => <motion.div key={section.category} layout initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-accent-500">
                    {section.category}
                  </h2>
                  <div className="space-y-4">
                    {section.questions.map((item, qIdx) => {
                const id = `${sIdx}-${qIdx}`;
                const isExpanded = expandedId === id;
                return <motion.div layout key={id} className={`glass rounded-2xl border transition-colors duration-300 overflow-hidden ${isExpanded ? 'border-primary-400 dark:border-primary-600 shadow-md' : 'border-gray-200 dark:border-gray-800'}`}>
                          <button onClick={() => setExpandedId(isExpanded ? null : id)} className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                            <span className="font-semibold text-gray-900 dark:text-white pr-4">{item.q}</span>
                            <div className={`p-1 rounded-full transition-colors ${isExpanded ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' : 'text-gray-400'}`}>
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </button>
                          <AnimatePresence>
                            {isExpanded && <motion.div initial={{
                      height: 0,
                      opacity: 0
                    }} animate={{
                      height: 'auto',
                      opacity: 1
                    }} exit={{
                      height: 0,
                      opacity: 0
                    }} transition={{
                      duration: 0.3
                    }}>
                                <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/50 pt-4">
                                  {item.a}
                                </div>
                              </motion.div>}
                          </AnimatePresence>
                        </motion.div>;
              })}
                  </div>
                </motion.div>)}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>;
};
export default FAQ;