import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Leaf, MapPin, Users, HeartHandshake, ShieldCheck, 
  Sparkles, Camera, Map, Truck, MessageSquare, Zap, Globe, Quote,
  ChevronRight, PlayCircle, Utensils, Home as HomeIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Demo stats as requested
  const stats = [
    { label: t('home.stat_donations'), value: '25', suffix: '+' },
    { label: t('home.stat_ngo'), value: '5', suffix: '' },
    { label: t('home.stat_cities'), value: '3', suffix: '' },
    { label: t('home.stat_carbon'), value: '30', suffix: 'T' }
  ];

  const timelineSteps = [
    { icon: Camera, title: t('home.step1_title'), desc: t('home.step1_desc') },
    { icon: Sparkles, title: t('home.step2_title'), desc: t('home.step2_desc') },
    { icon: MapPin, title: t('home.step3_title'), desc: t('home.step3_desc') },
    { icon: Truck, title: t('home.step4_title'), desc: t('home.step4_desc') }
  ];

  const features = [
    {
      icon: Sparkles,
      title: t('home.feat_ai_title'),
      desc: t('home.feat_ai_desc'),
      points: [t('home.feat_ai_p1'), t('home.feat_ai_p2'), t('home.feat_ai_p3')],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Map,
      title: t('home.feat_radar_title'),
      desc: t('home.feat_radar_desc'),
      points: [t('home.feat_radar_p1'), t('home.feat_radar_p2'), t('home.feat_radar_p3')],
      color: "from-primary-500 to-emerald-500",
      className: "lg:col-span-2"
    },
    {
      icon: Truck,
      title: t('home.feat_vol_title'),
      desc: t('home.feat_vol_desc'),
      points: [t('home.feat_vol_p1'), t('home.feat_vol_p2'), t('home.feat_vol_p3')],
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: MessageSquare,
      title: t('home.feat_comm_title'),
      desc: t('home.feat_comm_desc'),
      points: [t('home.feat_comm_p1'), t('home.feat_comm_p2'), t('home.feat_comm_p3')],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: t('home.feat_impact_title'),
      desc: t('home.feat_impact_desc'),
      points: [t('home.feat_impact_p1'), t('home.feat_impact_p2'), t('home.feat_impact_p3')],
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
            {t('home.hero_title')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-amber-500">{t('home.hero_highlight')}</span> <br className="hidden md:block" />
            {t('home.hero_suffix')}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {t('home.hero_desc')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20">
            <Link to="/register" className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">{t('home.cta')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link to="/dashboard" className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold text-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm">
              {t('home.text2')}
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
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8 font-light italic">{t('home.stat_demo_note')}</p>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="w-full py-32 bg-[#fafafa] dark:bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('home.how_title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('home.how_desc')}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('home.feat_title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('home.feat_desc')}</p>
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

      {/* 5. BUILT FOR COMMUNITIES */}
      <section className="w-full py-32 bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('home.comm_title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.comm_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
              <Utensils className="w-10 h-10 text-primary-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('home.comm_rest_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('home.comm_rest_desc')}</p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
              <HomeIcon className="w-10 h-10 text-primary-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('home.comm_ngo_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('home.comm_ngo_desc')}</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
              <Users className="w-10 h-10 text-primary-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('home.comm_vol_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('home.comm_vol_desc')}</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="p-8 rounded-[2rem] bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-900/10 border border-primary-100 dark:border-primary-800 shadow-xl shadow-primary-500/10 hover:-translate-y-2 transition-transform duration-300">
              <Leaf className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('home.comm_env_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('home.comm_env_desc')}</p>
            </motion.div>
          </div>

          {/* Statistics Banner */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-10 rounded-[2rem] bg-gray-900 text-white shadow-2xl relative overflow-hidden border border-gray-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10 text-center">
              <div>
                <div className="text-4xl font-extrabold mb-2">40%</div>
                <div className="text-gray-300 font-medium">{t('home.stat_waste')}</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-2">Millions</div>
                <div className="text-gray-300 font-medium">{t('home.stat_insecurity')}</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-2">AI + You</div>
                <div className="text-gray-300 font-medium">{t('home.stat_bridge')}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="w-full relative py-32 overflow-hidden bg-gray-900 dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-gray-900 to-amber-900/30" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            {t('home.cta_title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">{t('home.cta_title2')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {t('home.cta_desc')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
             <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               {t('home.cta_btn')}
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;