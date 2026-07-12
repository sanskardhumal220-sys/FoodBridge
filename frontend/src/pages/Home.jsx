import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Leaf, MapPin, Users, HeartHandshake, ShieldCheck, 
  Sparkles, Camera, Map, Truck, MessageSquare, Zap, Globe, Quote,
  ChevronRight, PlayCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Demo stats as requested
  const stats = [
    { label: 'Sample Donations', value: '25', suffix: '+' },
    { label: 'NGO Partners (Demo)', value: '5', suffix: '' },
    { label: 'Pilot Cities', value: '3', suffix: '' },
    { label: 'Potential Carbon Savings', value: '30', suffix: 'T' }
  ];

  const timelineSteps = [
    { icon: Camera, title: "1. Upload Surplus Food", desc: "Snap a photo of your excess food in seconds." },
    { icon: Sparkles, title: "2. AI FoodBrain Analyzes", desc: "Our AI predicts freshness, type, and servings instantly." },
    { icon: MapPin, title: "3. NGO Accepts", desc: "Nearby verified NGOs are notified and claim the food." },
    { icon: Truck, title: "4. Volunteer Delivers", desc: "Live-tracked delivery ensures food arrives safely and fast." }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI FoodBrain",
      desc: "Instantly analyzes food images to estimate freshness, safety, and nutritional impact.",
      points: ["Food recognition", "Freshness prediction", "Safety score"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Map,
      title: "NGO Radar Map",
      desc: "Connects donors with the nearest NGOs using real-time location mapping.",
      points: ["Nearby NGOs", "Real-time urgency indicators", "Direct routing"],
      color: "from-primary-500 to-emerald-500",
      className: "lg:col-span-2"
    },
    {
      icon: Truck,
      title: "Volunteer Network",
      desc: "Empower local drivers with optimized routing.",
      points: ["Live route tracking", "Distance calculation", "Delivery verification"],
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      desc: "Seamless live coordination between all parties.",
      points: ["Real-time chat", "AI auto translation", "Privacy protected"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Impact Dashboard",
      desc: "Track your contributions and environmental savings.",
      points: ["Meals saved", "Carbon reduction", "Social impact metrics"],
      color: "from-teal-500 to-cyan-500",
      className: "lg:col-span-2"
    }
  ];

  const testimonials = [
    { quote: "FoodBridge transformed how we handle our banquet surplus. It's effortless and incredibly fulfilling.", author: "David M.", role: "Restaurant Owner" },
    { quote: "The AI FoodBrain and live tracking give us total confidence in the food we serve to our shelter.", author: "Sarah L.", role: "NGO Director" },
    { quote: "Volunteering is so easy. The app routes me directly from the restaurant to the shelter in minutes.", author: "Michael K.", role: "Delivery Volunteer" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="flex flex-col items-center overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Animated Background Gradients & Particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent dark:from-primary-900/10" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-primary-400/10 blur-[120px] pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(20)].map((_, i) => (
             <motion.div key={i} className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
                initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                animate={{ y: [null, Math.random() * -500], opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
             />
           ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          
          {/* Badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="glass-card px-4 py-1.5 rounded-full text-sm font-semibold text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50 shadow-sm flex items-center gap-2">
              🌍 Sustainable
            </span>
            <span className="glass-card px-4 py-1.5 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 shadow-sm flex items-center gap-2">
              🤖 AI Powered
            </span>
            <span className="glass-card px-4 py-1.5 rounded-full text-sm font-semibold text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 shadow-sm flex items-center gap-2">
              ⚡ Real-Time Matching
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
            One Click. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-amber-500">Zero Waste.</span> <br className="hidden md:block" />
            Maximum Impact.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            FoodBridge connects surplus food from homes, restaurants, and events with NGOs and volunteers instantly. Powered by state-of-the-art AI.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20">
            <Link to="/register" className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">Start Rescuing Food <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link to="/dashboard" className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold text-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm">
              Explore Platform
            </Link>
          </motion.div>

          {/* Floating Food Icons */}
          <motion.div animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-4 md:left-12 lg:left-32 text-5xl opacity-80 filter drop-shadow-xl hidden sm:block pointer-events-none">🍎</motion.div>
          <motion.div animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-4 md:right-12 lg:right-32 text-6xl opacity-80 filter drop-shadow-xl hidden sm:block pointer-events-none">🥗</motion.div>
          <motion.div animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 left-10 md:left-24 lg:left-48 text-5xl opacity-80 filter drop-shadow-xl hidden sm:block pointer-events-none">🍞</motion.div>

        </div>
      </section>

      {/* 2. DEMO STATISTICS SECTION */}
      <section className="w-full py-16 bg-white dark:bg-[#0f0f0f] border-y border-gray-100 dark:border-gray-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                  {stat.value}<span className="text-primary-500">{stat.suffix}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8 font-light italic">*Statistics shown for demonstration purposes only.</p>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="w-full py-32 bg-[#fafafa] dark:bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How FoodBridge Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A seamless, 4-step process designed to rescue food at lightning speed.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-500 to-amber-200 dark:from-primary-900 dark:via-primary-500 dark:to-amber-900 z-0" />
            
            {timelineSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-primary-500/50">
                  <step.icon className="w-10 h-10 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM FEATURES GRID */}
      <section className="w-full py-32 bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20 md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Powerful Features Built for Scale</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to seamlessly coordinate surplus food distribution from a single platform.</p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} className={`relative group p-8 rounded-[2rem] bg-[#fafafa] dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 overflow-hidden ${feat.className || ''}`}>
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${feat.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 relative z-10">
                  <feat.icon className="w-7 h-7 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{feat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10 leading-relaxed">{feat.desc}</p>
                <ul className="space-y-3 relative z-10">
                  {feat.points.map((point, j) => (
                    <li key={j} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <ChevronRight className="w-4 h-4 text-primary-500 mr-2 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. IMPACT & TESTIMONIALS */}
      <section className="w-full py-32 bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Loved by Communities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">See how FoodBridge is making a tangible difference.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-primary-200 dark:text-primary-900 mb-6" />
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic mb-8">"{test.quote}"</p>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{test.author}</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">{test.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="w-full relative py-32 overflow-hidden bg-gray-900 dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-gray-900 to-amber-900/30" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Together We Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">End Food Waste.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of restaurants, NGOs, and volunteers making a real impact every single day.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
             <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               Join FoodBridge
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;