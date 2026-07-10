import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, HeartHandshake, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden py-20 lg:py-32 bg-white dark:bg-gray-950">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950/30 dark:via-gray-950 dark:to-accent-900/20 -z-10" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent-400/20 blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="text-center lg:text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300 font-semibold text-sm"
              >
                Bridging Food. Building Hope.
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
              >
                {t('home.hero_title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">{t('home.hero_highlight')}</span> {t('home.hero_suffix')}
              </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10"
            >
              {t('home.hero_desc')}
            </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center lg:justify-start gap-4"
              >
                <Link to="/register" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-xl shadow-primary-500/30 flex items-center gap-2 hover:scale-105">
                  {t('home.cta')} <ArrowRight size={20} />
                </Link>
                <Link to="/dashboard" className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-accent-500 dark:hover:border-accent-500 text-gray-700 dark:text-gray-200 px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105">
                  Explore Platform
                </Link>
              </motion.div>
            </div>

            {/* Visual/Logo Component */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-md lg:max-w-lg relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-200 to-primary-200 dark:from-accent-900/40 dark:to-primary-900/40 rounded-full blur-3xl opacity-50 animate-pulse" />
              <img 
                src="/logo.png" 
                alt="FoodBridge Logo Hero" 
                className="w-full h-auto drop-shadow-2xl relative z-10 rounded-3xl mix-blend-multiply dark:mix-blend-normal"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-10 h-10 text-primary-500" />}
              title={t('home.feat1_title')}
              description={t('home.feat1_desc')}
            />
            <FeatureCard 
              icon={<MapPin className="w-10 h-10 text-primary-500" />}
              title={t('home.feat2_title')}
              description={t('home.feat2_desc')}
            />
            <FeatureCard 
              icon={<HeartHandshake className="w-10 h-10 text-primary-500" />}
              title={t('home.feat3_title')}
              description={t('home.feat3_desc')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl glass"
  >
    <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;
