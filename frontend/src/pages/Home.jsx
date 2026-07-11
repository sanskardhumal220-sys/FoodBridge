import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, HeartHandshake, MapPin, Activity, Users, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const { t } = useTranslation();

  const {
    t
  } = useTranslation();
  const {
    scrollYProgress
  } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [stats, setStats] = useState({
    mealsRescued: 0,
    activeNGOs: 0,
    citiesServed: 0,
    carbonSaved: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {
          data
        } = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/public/stats');
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    const {
      left,
      top
    } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(26, 184, 95, 0.15),
      transparent 80%
    )
  `;

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full relative min-h-[90vh] flex items-center py-20 lg:py-32 bg-white dark:bg-[#0a0a0a]" onMouseMove={handleMouseMove}>
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-accent-950/20 -z-10" />
        <motion.div className="absolute inset-0 z-0 hidden md:block" style={{
        background: backgroundGradient
      }} />
        
        {/* Animated Blobs */}
        <motion.div animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0]
      }} transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }} className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] rounded-full bg-primary-400/20 blur-[100px]" />
        <motion.div animate={{
        scale: [1, 1.3, 1],
        rotate: [0, -90, 0]
      }} transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
        delay: 1
      }} className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[25rem] h-[25rem] rounded-full bg-accent-400/20 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Text Content */}
            <div className="text-center lg:text-left max-w-2xl z-10">
              <motion.div initial={{
              opacity: 0,
              scale: 0.8,
              y: -20
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              type: 'spring'
            }} className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass-card border border-accent-200 dark:border-accent-800/50 text-accent-700 dark:text-accent-300 font-semibold text-sm shadow-xl shadow-accent-500/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
                </span>{t("home.text1")}</motion.div>

              <motion.h1 initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.2,
              type: 'spring'
            }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                {t('home.hero_title')} <span className="text-gradient relative inline-block">
                  {t('home.hero_highlight')}
                  <motion.svg className="absolute w-full h-3 -bottom-2 left-0 text-primary-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <motion.path initial={{
                    pathLength: 0
                  }} animate={{
                    pathLength: 1
                  }} transition={{
                    duration: 1,
                    delay: 0.8
                  }} d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </motion.svg>
                </span> {t('home.hero_suffix')}
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.4
            }} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light">
                {t('home.hero_desc')}
              </motion.p>

              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.6
            }} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/register" className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-primary-500/30 flex items-center justify-center gap-3 hover:-translate-y-1">
                  {t('home.cta')} 
                  <motion.span group-hover={{
                  x: 5
                }} transition={{
                  type: "spring"
                }}>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
                <Link to="/dashboard" className="glass-card text-gray-800 dark:text-gray-200 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 hover:shadow-xl flex justify-center items-center">{t("home.text2")}</Link>
              </motion.div>
            </div>

            {/* Visual/Logo Component */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -5
          }} animate={{
            opacity: 1,
            scale: 1,
            rotate: 0
          }} transition={{
            duration: 1,
            type: "spring",
            delay: 0.3
          }} className="w-full max-w-md lg:max-w-lg relative z-10 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-400 to-primary-400 rounded-full blur-[80px] opacity-30 animate-pulse" />
              
              {/* Floating Animation */}
              <motion.div animate={{
              y: [-15, 15, -15]
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                <img src="/logo.png" alt="FoodBridge Logo Hero" className="w-full h-auto drop-shadow-2xl relative z-10 rounded-[3rem] border border-white/20 glass" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-primary-600 dark:bg-primary-950 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-50px"
        }} variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{
            label: 'Meals Rescued',
            value: stats.mealsRescued.toString()
          }, {
            label: 'Active NGOs',
            value: stats.activeNGOs.toString()
          }, {
            label: 'Cities Served',
            value: stats.citiesServed.toString()
          }, {
            label: 'Carbon Saved',
            value: stats.carbonSaved + 'T'
          }].map((stat, i) => <motion.div key={i} variants={itemVariants} className="text-white">
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
                <div className="text-primary-100 font-medium opacity-90">{stat.label}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-32 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">{t("home.text3")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t("home.text4")}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="lg:col-span-2 lg:row-span-2">
              <FeatureCard icon={<Leaf className="w-12 h-12 text-primary-500" />} title={t('home.feat1_title')} description={t('home.feat1_desc')} variants={itemVariants} className="h-full flex flex-col justify-center bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-[#0f0f0f]" />
            </div>
            <div className="lg:col-span-1 lg:row-span-1">
              <FeatureCard icon={<MapPin className="w-8 h-8 text-accent-500" />} title={t('home.feat2_title')} description={t('home.feat2_desc')} variants={itemVariants} className="h-full bg-gradient-to-br from-accent-50 to-white dark:from-accent-900/20 dark:to-[#0f0f0f]" />
            </div>
            <div className="lg:col-span-1 lg:row-span-1">
              <FeatureCard icon={<HeartHandshake className="w-8 h-8 text-blue-500" />} title={t('home.feat3_title')} description={t('home.feat3_desc')} variants={itemVariants} className="h-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-[#0f0f0f]" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
};
const FeatureCard = ({
  icon,
  title,
  description,
  variants,
  className = ""
}) => <motion.div variants={variants} whileHover={{
  scale: 0.98
}} className={`relative p-8 rounded-[2rem] glass-card group overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}>
    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 rounded-full bg-primary-500/10 blur-2xl group-hover:bg-primary-500/20 transition-colors" />
    <motion.div whileHover={{
    rotate: 5,
    scale: 1.1
  }} className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary-200 dark:border-primary-800">
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold mb-4 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{description}</p>
  </motion.div>;
export default Home;